

let deployInProgress = false;

export async function triggerDeployHook() {
  if (deployInProgress) return;

  if (import.meta.env.MODE !== "production") return;

  const url = import.meta.env.PUBLIC_DEPLOY_HOOK_URL;

  if (!url) {
    console.error("Missing PUBLIC_DEPLOY_HOOK_URL");
    return;
  }

  deployInProgress = true;

  try {
    const res = await fetch(url, {
      method: "POST",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Deploy hook failed:", res.status, text);
    } else {
      console.log("Deploy triggered");
    }
  } catch (err) {
    console.error("Deploy hook error:", err);
  } finally {
    setTimeout(() => {
      deployInProgress = false;
    }, 60_000);
  }
}
