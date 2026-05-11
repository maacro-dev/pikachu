import { supabase } from "./supabase";

const BUCKET = "content-media";

export type UploadResult = { url: string; path: string };

export async function uploadMedia(
  file: File,
  folder: string = "general"
): Promise<UploadResult> {
  const ext = file.name.split(".").pop();
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = `${folder}/${filename}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteMedia(paths: string | string[]): Promise<void> {
  const arr = Array.isArray(paths) ? paths : [paths];
  const { error } = await supabase.storage.from(BUCKET).remove(arr);
  if (error) throw error;
}

export function extractStoragePath(publicUrl: string): string | null {
  try {
    const url = new URL(publicUrl);
    const marker = `/public/${BUCKET}/`;
    const idx = url.pathname.indexOf(marker);
    if (idx === -1) return null;
    return url.pathname.slice(idx + marker.length);
  } catch {
    return null;
  }
}
