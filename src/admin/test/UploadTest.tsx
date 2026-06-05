import { useEffect, useState } from "react";

import type { UploadedImage } from "../services/mediaService";
import ImageField from "../components/media/ImageField";
import { listImages } from "../services/mediaService";
import Button from "../ui/Button";
import ImageGalleryModal from "../components/media/ImageGalleryModal";
import ImageGalleryField from "../components/media/ImageGalleryField";

export default function UploadTest() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = await listImages("general");

        setImages(result);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return <ImageGalleryField folder="general" value={images} onChange={setImages} />;
}
