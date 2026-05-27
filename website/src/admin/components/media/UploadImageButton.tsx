import { useState }
  from "react";

import Button from "../../ui/Button";

import {
  uploadImage,
  type UploadedImage,
} from "../../services/mediaService";

interface Props {
  folder: string;
  onUploaded: (
    image: UploadedImage
  ) => void;
}

export default function UploadImageButton({
  folder,
  onUploaded,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const uploaded =
        await uploadImage(
          file,
          folder
        );

        console.log('uploaded object:', uploaded);

      onUploaded(uploaded);
    } catch (err) {
      console.error(err);

      alert(
        "Nepodařilo se nahrát obrázek"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
  <div>
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      hidden
      onChange={handleChange}
    />

    <Button
      type="button"
      disabled={loading}
      onClick={() => {
        document
          .getElementById(
            "image-upload"
          )
          ?.click();
      }}
    >
      {loading
        ? "Nahrávám..."
        : "Nahrát obrázek"}
    </Button>
  </div>
);
}