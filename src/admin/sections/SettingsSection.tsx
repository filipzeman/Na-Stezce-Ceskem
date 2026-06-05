import { useEffect, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";

export default function SettingsSection() {
  const [settings, setSettings] = useState<
    Record<string, string>
  >({});

  const [saving, setSaving] = useState(false);

  async function loadSettings() {
    try {
      const data = await getSettings();

      setSettings(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function updateSetting(
    key: string,
    value: string
  ) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateSettings(settings);

      alert("Uloženo");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="settings-layout">
      {/* WEBSITE */}

      <Card title="Web">
        <div className="settings-form">
          <Input
            label="Název webu"
            value={settings.site_title || ""}
            onChange={(e) =>
              updateSetting(
                "site_title",
                e.target.value
              )
            }
          />

          <Input
            label="Kontaktní email"
            value={settings.site_email || ""}
            onChange={(e) =>
              updateSetting(
                "site_email",
                e.target.value
              )
            }
          />

          <div className="settings-actions">
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Ukládám..."
                : "Uložit"}
            </Button>
          </div>
        </div>
      </Card>

      {/* MAPS */}

      <Card title="Mapy">
        <div className="settings-form">
          <Input
            label="Oficiální trasa"
            placeholder="https://mapy.com/..."
            value={
              settings.official_route_url || ""
            }
            onChange={(e) =>
              updateSetting(
                "official_route_url",
                e.target.value
              )
            }
          />

          <Input
            label="Ubytování"
            placeholder="https://mapy.com/..."
            value={
              settings.accommodation_route_url ||
              ""
            }
            onChange={(e) =>
              updateSetting(
                "accommodation_route_url",
                e.target.value
              )
            }
          />

          <Input
            label="Občerstvení"
            placeholder="https://mapy.com/..."
            value={
              settings.refreshments_route_url ||
              ""
            }
            onChange={(e) =>
              updateSetting(
                "refreshments_route_url",
                e.target.value
              )
            }
          />

          <div className="settings-actions">
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Ukládám..."
                : "Uložit"}
            </Button>
          </div>
        </div>
      </Card>

      {/* ALERT */}

      <Card title="Upozornění">
        <div className="settings-form">
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={
                settings.alert_enabled ===
                "true"
              }
              onChange={(e) =>
                updateSetting(
                  "alert_enabled",
                  String(e.target.checked)
                )
              }
            />

            Aktivovat upozornění
          </label>

          <div className="input-group">
            <label className="input-label">
              Text upozornění
            </label>

            <textarea
              className="textarea"
              placeholder="Např. Uzavírka části trasy..."
              value={
                settings.alert_text || ""
              }
              onChange={(e) =>
                updateSetting(
                  "alert_text",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-actions">
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Ukládám..."
                : "Uložit"}
            </Button>
          </div>
        </div>
      </Card>

      {/* PWA */}

      <Card title="Aplikace">
        <div className="settings-form">
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={
                settings.show_offline_status ===
                "true"
              }
              onChange={(e) =>
                updateSetting(
                  "show_offline_status",
                  String(e.target.checked)
                )
              }
            />

            Zobrazovat offline stav
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={
                settings.enable_geolocation ===
                "true"
              }
              onChange={(e) =>
                updateSetting(
                  "enable_geolocation",
                  String(e.target.checked)
                )
              }
            />

            Povolit geolokaci
          </label>

          <div className="settings-actions">
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Ukládám..."
                : "Uložit"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}