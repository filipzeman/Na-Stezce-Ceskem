import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function SettingsSection() {
  return (
    <div className="settings-layout">
      {/* WEBSITE */}

      <Card title="Web">
        <div className="settings-form">
          <Input
            label="Název webu"
            defaultValue="NaStezce Českem"
          />

          <Input
            label="Kontaktní email"
            defaultValue="info@nastezceceskem.cz"
          />

          <div className="settings-actions">
            <Button>
              Uložit
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
          />

          <Input
            label="Ubytování"
            placeholder="https://mapy.com/..."
          />

          <Input
            label="Občerstvení"
            placeholder="https://mapy.com/..."
          />

          <div className="settings-actions">
            <Button>
              Uložit
            </Button>
          </div>
        </div>
      </Card>

      {/* ALERT */}

      <Card title="Upozornění">
        <div className="settings-form">
          <label className="checkbox-row">
            <input type="checkbox" />

            Aktivovat upozornění
          </label>

          <div className="input-group">
            <label className="input-label">
              Text upozornění
            </label>

            <textarea
              className="textarea"
              placeholder="Např. Uzavírka části trasy..."
            />
          </div>

          <div className="settings-actions">
            <Button>
              Uložit
            </Button>
          </div>
        </div>
      </Card>

      {/* PWA */}

      <Card title="Aplikace">
        <div className="settings-form">
          <label className="checkbox-row">
            <input type="checkbox" />

            Zobrazovat offline stav
          </label>

          <label className="checkbox-row">
            <input type="checkbox" />

            Povolit geolokaci
          </label>

          <div className="settings-actions">
            <Button>
              Uložit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}