import { useState } from "react";

import UploadImageButton from "./UploadImageButton";

import ImageGalleryModal from "./ImageGalleryModal";

import type { UploadedImage } from "../../services/mediaService";

interface Props {
  folder: string;

  value: UploadedImage[];

  onChange: (images: UploadedImage[]) => void;
}

export default function ImageGalleryField({ folder, value, onChange }: Props) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  function handleAdd(image: UploadedImage) {
    const exists = value.some((img) => img.path === image.path);

    if (exists) return;

    onChange([...value, image]);
  }

  function handleRemove(path: string) {
    onChange(value.filter((img) => img.path !== path));
  }

  return (
    <div className="gallery-field">
      <div className="gallery-toolbar">
        <UploadImageButton folder={folder} onUploaded={handleAdd} />

        <button type="button" className="btn btn-secondary" onClick={() => setGalleryOpen(true)}>
          Vybrat existující
        </button>
      </div>

      <div className="gallery-grid">
        {value.map((image) => (
          <div key={image.path} className="gallery-card">
            <img src={image.publicUrl} alt="" />

            <button
              type="button"
              className="gallery-remove"
              onClick={() => handleRemove(image.path)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <ImageGalleryModal
        open={galleryOpen}
        folder={folder}
        onClose={() => setGalleryOpen(false)}
        onSelect={handleAdd}
      />
    </div>
  );
}
