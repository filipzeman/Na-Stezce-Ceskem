import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";

import { listImages, type UploadedImage } from "../../services/mediaService";

interface Props {
  open: boolean;
  folder: string;
  onClose: () => void;
  onSelect: (image: UploadedImage) => void;
}

export default function ImageGalleryModal({ open, folder, onClose, onSelect }: Props) {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function load() {
      try {
        setLoading(true);

        const data = await listImages(folder);

        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [open, folder]);

  if (!open) return null;

  return (
    <Modal open={open} title="Vybrat obrázek" onClose={onClose}>
      {loading ? (
        <p>Načítám...</p>
      ) : (
        <div className="media-grid">
          {images.map((image) => (
            <button
              key={image.path}
              className="media-item"
              onClick={() => {
                onSelect(image);

                onClose();
              }}
            >
              <img src={image.publicUrl} alt="" />
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
