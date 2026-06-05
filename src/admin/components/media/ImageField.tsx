import UploadImageButton from "./UploadImageButton";

import { deleteImage } from "../../services/mediaService";
import type { UploadedImage } from "../../services/mediaService";

interface Props {
  label?: string;
  value?: UploadedImage | null;
  folder: string;
  onChange: (image: UploadedImage | null) => void;
}

export default function ImageField({ label, value, folder, onChange }: Props) {
  return (
    <div className="image-field">
      {label && <label className="input-label">{label}</label>}

      {value ? (
        <div className="image-preview">
          <img src={value?.publicUrl} alt="" />

          <div className="image-actions">
            <button
              type="button"
              className="btn btn-danger"
              onClick={async () => {
                try {
                  await deleteImage(value.path);

                  onChange(null);
                } catch (err) {
                  console.error(err);

                  alert("Nepodařilo se odstranit obrázek");
                }
              }}
            >
              Odebrat
            </button>
          </div>
        </div>
      ) : (
        <div className="image-empty">
          <UploadImageButton folder={folder} onUploaded={(image) => onChange(image)} />
        </div>
      )}
    </div>
  );
}
