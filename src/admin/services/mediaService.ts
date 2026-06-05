import { getSupabase } from "../../lib/supabase";

const BUCKET = "images";

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

export async function deleteImage(
  path: string
) {
  const supabase = getSupabase();

  console.log('Deleting image with path:', path);

  const result =
    await supabase.storage
      .from(BUCKET)
      .remove([path]);

    console.log('Delete result:', result);

  if (result.error) {
    throw result.error;
  }
}

export async function listImages(
  folder: string
): Promise<UploadedImage[]> {
  const supabase = getSupabase();

  const { data, error } =
    await supabase.storage
      .from(BUCKET)
      .list(folder, {
        limit: 100,
        sortBy: {
          column: "created_at",
          order: "desc",
        },
      });

  if (error) {
    throw error;
  }

  return (data ?? []).map((file) => {
    const path =
      `${folder}/${file.name}`;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path);

    return {
      path,
      publicUrl,
    };
  });
}
