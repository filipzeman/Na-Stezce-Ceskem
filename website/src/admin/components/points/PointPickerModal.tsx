import { useMemo, useState } from "react";

import Modal from "../../ui/Modal";
import Input from "../../ui/Input";

import type { Point } from "../../../types/point";

import { normalizeText } from "../../../utils/text";

interface Props {
  open: boolean;

  points: Point[];

  onClose: () => void;

  onSelect: (point: Point) => void;
}

export default function PointPickerModal({ open, points, onClose, onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filteredPoints = useMemo(() => {
    return points.filter((point) =>
      normalizeText(point.point_name).includes(normalizeText(search))
    );
  }, [points, search]);

  return (
    <Modal open={open} title="Vybrat bod" onClose={onClose}>
      <div className="point-picker">
        <Input
          placeholder="Hledat bod..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="point-picker-list">
          {filteredPoints.map((point) => (
            <button
              key={point.id}
              className="point-picker-item"
              onClick={() => {
                onSelect(point);

                onClose();
              }}
            >
              <span>{point.point_name}</span>

              <small>{point.km} km</small>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
