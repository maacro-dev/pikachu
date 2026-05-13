// supabase/functions/save-content/index.ts

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const DEPLOY_HOOK_URL = Deno.env.get("PUBLIC_DEPLOY_HOOK_URL");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { action, type, data } = await req.json();

    if (!action || !type || !data) {
      return new Response(JSON.stringify({ error: "Missing action, type, or data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await executeOperation(action, type, data);
    if (result.error) {
      throw new Error(result.error.message);
    }

    await triggerDeploy();

    return new Response(
      JSON.stringify({ success: true, data: result.data }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

async function executeOperation(
  action: string,
  type: string,
  payload: any
) {
  const { main_image, gallery_images, ...rest } = payload;

  // Build common parameters for create/update
  const baseParams = {
    ...rest,
    p_main_image: main_image || null,
    p_gallery_images: gallery_images || [],
  };

  if (action === "create") {
    // All create RPCs return a table with the new IDs
    switch (type) {
      case "district":
        return await supabaseAdmin.rpc("create_district", baseParams);
      case "municipality":
        return await supabaseAdmin.rpc("create_municipality", baseParams);
      case "attractions":
        return await supabaseAdmin.rpc("create_attraction", baseParams);
      case "foods":
        return await supabaseAdmin.rpc("create_food", baseParams);
      case "festivals":
        return await supabaseAdmin.rpc("create_festival", baseParams);
      case "events":
        return await supabaseAdmin.rpc("create_event", baseParams);
      default:
        throw new Error(`Unknown content type: ${type}`);
    }
  } else if (action === "update") {
    const { content_id, municipality_id, district_id, ...updateData } = payload;
    const updateParams = {
      p_content_id: content_id,
      p_district_id: district_id || null,
      p_municipality_id: municipality_id || null,
      ...updateData,
      p_main_image: main_image || null,
      p_gallery_images: gallery_images || [],
    };

    switch (type) {
      case "district":
        return await supabaseAdmin.rpc("update_district", updateParams);
      case "municipality":
        return await supabaseAdmin.rpc("update_municipality", updateParams);
      case "attractions":
        return await supabaseAdmin.rpc("update_attraction", updateParams);
      case "foods":
        return await supabaseAdmin.rpc("update_food", updateParams);
      case "festivals":
        return await supabaseAdmin.rpc("update_festival", updateParams);
      case "events":
        return await supabaseAdmin.rpc("update_event", updateParams);
      default:
        throw new Error(`Unknown content type: ${type}`);
    }
  } else {
    throw new Error(`Unknown action: ${action}`);
  }
}

async function triggerDeploy() {
  if (!DEPLOY_HOOK_URL) {
    console.warn("PUBLIC_DEPLOY_HOOK_URL not set – skipping deploy trigger");
    return;
  }
  const res = await fetch(DEPLOY_HOOK_URL, { method: "POST" });
  if (!res.ok) {
    const text = await res.text();
    console.error("Deploy hook failed:", res.status, text);
    // we don’t throw here – the save already succeeded
  } else {
    console.log("Deploy triggered");
  }
}
