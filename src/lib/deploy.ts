

let deployPending = false;

export async function triggerDeployHook() {
  if (!import.meta.env.PROD) return;
  if (deployPending) return;

  const url = import.meta.env.DEPLOY_HOOK_URL;

  if (!url) return;

  deployPending = true;

  try {
    await fetch(url, { method: "POST" });
  } catch (err) {
    console.error("Deploy hook failed:", err);
  } finally {
    deployPending = false;
  }
}
