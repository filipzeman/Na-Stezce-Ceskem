export async function optimizeImage(file: File, maxWidth = 1600, quality = 0.82): Promise<File> {
  const image = await createImageBitmap(file);

  const scale = Math.min(1, maxWidth / image.width);

  const canvas = document.createElement("canvas");

  canvas.width = image.width * scale;

  canvas.height = image.height * scale;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return file;
  }

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", quality);
  });

  if (!blob) {
    return file;
  }

  return new File([blob], file.name.replace(/\.(png|jpg|jpeg|webp)$/i, ".jpg"), {
    type: "image/jpeg",
  });
}
