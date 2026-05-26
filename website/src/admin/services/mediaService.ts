import { getSupabase } from "../../lib/supabase";

const BUCKET = "media";

export interface UploadedImage {
  path: string;
  publicUrl: string;
}

export async function uploadImage(file: File, folder: string): Promise<UploadedImage> {
  const supabase = getSupabase();

  const extension = file.name.split(".").pop();

  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const path = `${folder}/${filename}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return {
    path,
    publicUrl,
  };
}
