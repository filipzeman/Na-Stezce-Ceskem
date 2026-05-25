import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null;


  useEffect(() => {
  if (open) {
    document.body.style.overflow =
      "hidden";
  } else {
    document.body.style.overflow =
      "";
  }

  return () => {
    document.body.style.overflow =
      "";
  };
}, [open]);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {(title || onClose) && (
          <div className="modal-header">
            {title && <h2>{title}</h2>}

            <button
              type="button"
              className="modal-close"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}