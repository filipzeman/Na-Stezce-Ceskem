import { getSupabase } from "../../lib/supabase";

const BUCKET = "images";
const ABSOLUTE_URL_RE = /^https?:\/\//i;
const STORAGE_PUBLIC_PREFIX = `/storage/v1/object/public/${BUCKET}/`;

export interface UploadedImage {
  path: string;
  publicUrl: string;
}

function toStoragePath(pathOrUrl: string): string {
  const value = pathOrUrl.trim();

  if (!value) {
    return "";
  }

  if (!ABSOLUTE_URL_RE.test(value)) {
    return value.replace(/^\/+/, "");
  }

  try {
    const url = new URL(value);
    const index = url.pathname.indexOf(STORAGE_PUBLIC_PREFIX);

    if (index === -1) {
      return value;
    }

    const path = url.pathname.slice(index + STORAGE_PUBLIC_PREFIX.length);

    return decodeURIComponent(path).replace(/^\/+/, "");
  } catch {
    return value;
  }
}

export function toPublicImageUrl(pathOrUrl: string): string {
  if (ABSOLUTE_URL_RE.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const path = toStoragePath(pathOrUrl);

  if (!path) {
    return path;
  }

  const supabase = getSupabase();

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return publicUrl;
}

export function toUploadedImage(pathOrUrl: string): UploadedImage {
  const path = toStoragePath(pathOrUrl);

  return {
    path,
    publicUrl: toPublicImageUrl(pathOrUrl),
  };
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

  return toUploadedImage(path);
}

export async function deleteImage(path: string) {
  const supabase = getSupabase();

  console.log("Deleting image with path:", path);

  const result = await supabase.storage.from(BUCKET).remove([path]);

  console.log("Delete result:", result);

  if (result.error) {
    throw result.error;
  }
}

export async function listImages(folder: string): Promise<UploadedImage[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
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
    const path = `${folder}/${file.name}`;

    return toUploadedImage(path);
  });
}
