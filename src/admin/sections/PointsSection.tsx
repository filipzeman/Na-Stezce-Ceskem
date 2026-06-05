import { useEffect, useMemo, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

import ImageGalleryField from "../components/media/ImageGalleryField";

import PointPickerModal from "../components/points/PointPickerModal";

import { getPoints, getPointDetails, savePointDetails } from "../services/pointDetailsService";

import type { Point } from "../../types/point";

import type { PointDetails } from "../../types/pointDetails";

import type { UploadedImage } from "../services/mediaService";

import { normalizeText } from "../../utils/text";

export default function PointsSection() {
  const [points, setPoints] = useState<Point[]>([]);

  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const [details, setDetails] = useState<PointDetails | null>(null);

  const [search, setSearch] = useState("");

  const [pickerOpen, setPickerOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPoints();

        setPoints(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (!selectedPoint) return;

    async function loadDetails() {
      try {
        const data = await getPointDetails(selectedPoint?.id);

        setDetails({
          point_id: selectedPoint?.id,

          phone: data?.phone || "",

          email: data?.email || "",

          website: data?.website || "",

          opening_info: data?.opening_info || "",

          note: data?.note || "",

          hikers_welcome: data?.hikers_welcome || false,

          active: data?.active ?? true,

          images: data?.images || [],
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadDetails();
  }, [selectedPoint]);

  const filteredPoints = useMemo(() => {
    return points.filter((point) =>
      normalizeText(point.point_name).includes(normalizeText(search))
    );
  }, [points, search]);

  async function handleSave() {
    if (!details) return;

    try {
      setSaving(true);
      setSaved(false);

      await savePointDetails(details);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="points-content">
      {/* SELECTOR */}

      <div className="points-selector">
        <Card title="Body na trase">
          <div className="points-sidebar">
            <Input
              placeholder="Zadejte nebo vyberte z nabídky..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="points-list">
              {filteredPoints.map((point) => (
                <button
                  key={point.id}
                  className={`point-item ${selectedPoint?.id === point.id ? "active" : ""}`}
                  onClick={() => setSelectedPoint(point)}
                >
                  <span>{point.point_name}</span>

                  <small>{point.km} km</small>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* EDITOR */}

      <div className="points-editor">
        {selectedPoint && details ? (
          <Card title={selectedPoint.point_name}>
            <div className="settings-form">
              <div className="settings-form">
                <Input
                  label="Telefon"
                  value={details.phone || ""}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      phone: e.target.value,
                    })
                  }
                />

                <Input
                  label="Email"
                  value={details.email || ""}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      email: e.target.value,
                    })
                  }
                />

                <Input
                  label="Web"
                  value={details.website || ""}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      website: e.target.value,
                    })
                  }
                />

                <div className="input-group">
                  <label className="input-label">Otevírací doba</label>

                  <textarea
                    className="textarea"
                    value={details.opening_info || ""}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        opening_info: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Poznámka</label>

                  <textarea
                    className="textarea"
                    value={details.note || ""}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        note: e.target.value,
                      })
                    }
                  />
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={details.active}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        active: e.target.checked,
                      })
                    }
                  />
                  Aktivní
                </label>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={details.hikers_welcome || false}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        hikers_welcome: e.target.checked,
                      })
                    }
                  />
                  Hikers welcome
                </label>

                <ImageGalleryField
                  folder={`points/${selectedPoint.id}`}
                  value={(details.images || []) as UploadedImage[]}
                  onChange={(images) =>
                    setDetails({
                      ...details,
                      images,
                    })
                  }
                />

                <div className="settings-actions">
                  <Button disabled={saving} onClick={handleSave}>
                    {saving ? "Ukládám..." : saved ? "Uloženo" : "Uložit"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card title="Správa bodů">
            <div className="empty-state">
              <p className="no-vertical-spacing">
                Vyberte bod ze seznamu vlevo nebo jej vyhledejte.
              </p>
              <ul>
                <li>Kontakty</li>
                <li>Otevírací doba</li>
                <li>Poznámky</li>
                <li>Fotografie</li>
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
