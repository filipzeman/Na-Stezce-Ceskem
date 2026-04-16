# Komplexní návrh UX/UI pro PWA instalaci a offline režim

Na základě analýzy kódu vidím, že už máte základní offline toastery implementované v `BaseLayout.astro` (zprávy jako "Aplikace je připravena pro offline použití", "Jste offline", "Zpět online"). To je skvělý základ! Nyní navrhuji komplexní řešení, jak to vylepšit a efektivně informovat návštěvníky.

## 1. Aktuální stav
- **PWA funkce:** Manifest, service worker pro cache stránek a obrázků
- **Offline toastery:** Základní notifikace v BaseLayout
- **Chybí:** Proaktivní informování o instalaci, detailní instrukce, UX vylepšení

## 2. UX/UI návrhy pro web

### A) Vylepšený instalační banner (na homepage a itineráři)
```astro
<!-- Nová komponenta InstallBanner.astro -->
<div class="install-banner" id="install-banner">
  <div class="banner-content">
    <Icon name="Download" size={20} />
    <div class="banner-text">
      <strong>Nainstalujte aplikaci pro offline použití</strong>
      <p>Přístup k itineráři i bez internetu</p>
    </div>
    <button class="btn btn-sm" onclick="showInstallInstructions()">Jak na to</button>
    <button class="banner-close" onclick="hideBanner()">×</button>
  </div>
</div>
```

**Styly:**
```css
.install-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-primary);
  color: white;
  padding: 12px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 1200px;
  margin: 0 auto;
}

.banner-close {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}
```

### B) Modal s detailními instrukcemi instalace
```astro
<!-- InstallModal.astro -->
<div class="modal-overlay" id="install-modal">
  <div class="modal">
    <div class="modal-header">
      <h3>Jak nainstalovat aplikaci</h3>
      <button onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <div class="instruction-step">
        <div class="step-number">1</div>
        <div>
          <strong>Klikněte na tlačítko "Sdílet" nebo "Instalovat"</strong>
          <p>V prohlížeči Chrome/Safari/Edge najdete ikonu pro instalaci</p>
        </div>
      </div>
      <div class="instruction-step">
        <div class="step-number">2</div>
        <div>
          <strong>Vyberte "Přidat na domovskou obrazovku"</strong>
          <p>Aplikace se přidá mezi vaše aplikace</p>
        </div>
      </div>
      <div class="instruction-step">
        <div class="step-number">3</div>
        <div>
          <strong>Otevřete aplikaci</strong>
          <p>Funguje i bez internetu - všechny body jsou uložené</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### C) Vylepšené offline toastery
Aktuální toastery rozšířit o:
- **Ikony:** Přidat ikony pro lepší vizuální komunikaci
- **Trvání:** Delší zobrazení pro důležité zprávy
- **Akce:** Tlačítko "OK" pro rychlé zavření

```javascript
function showOfflineToast(message, type = 'info', duration = 4000) {
  const toast = document.createElement("div");
  toast.className = `offline-toast ${type}`;
  
  const icon = type === 'offline' ? 'WifiOff' : 
               type === 'online' ? 'Wifi' : 'CheckCircle';
  
  toast.innerHTML = `
    <Icon name="${icon}" size={16} />
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}
```

### D) Offline indikátor v headeru
Přidat malý indikátor v headeru, který ukazuje stav připojení:
```astro
<!-- V Header.astro -->
<div class="connection-status" id="connection-status">
  <Icon name="Wifi" size={16} />
  <span>Online</span>
</div>
```

## 3. Blog článek: "Jak si uložit web jako aplikaci a používat offline"

**Návrh struktury článku:**

### Úvod
- Proč je offline režim důležitý pro turisty
- Co aplikace nabízí offline

### Jak nainstalovat aplikaci
1. **Na mobilu (Android/iOS):**
   - Otevřít v prohlížeči
   - Kliknout na "Sdílet" → "Přidat na domovskou obrazovku"
   - Potvrdit instalaci

2. **Na počítači (Chrome/Edge):**
   - Kliknout na ikonu instalace v adresním řádku
   - Nebo menu → "Instalovat aplikaci"

#### Co funguje offline
- ✅ Kompletní itinerář všech bodů
- ✅ Detailní informace o bodech
- ✅ Obrázky (pokud byly načtené)
- ✅ Filtrování bodů
- ❌ Nové obrázky (vyžadují internet)

#### Jak aplikace funguje offline
- Service Worker automaticky cachuje data
- Při prvním načtení se stáhnou všechna data
- Offline funguje vše kromě nových obrázků

#### Řešení problémů
- Pokud nefunguje: Vymazat cache prohlížeče
- Zkontrolovat, zda je service worker registrovaný

## 4. FAQ sekce rozšíření

Přidat do `caste-dotazy.astro` tyto otázky:

```astro
<!-- Nové FAQ položky -->
<FaqAccordion>
  <div slot="question">Jak si nainstalovat aplikaci pro offline použití?</div>
  <div slot="answer">
    <p>Aplikaci můžete nainstalovat jako PWA (Progressive Web App):</p>
    <ol>
      <li>Otevřete stránku v prohlížeči Chrome, Safari nebo Edge</li>
      <li>Klikněte na ikonu instalace v adresním řádku nebo v menu</li>
      <li>Vyberte "Přidat na domovskou obrazovku" nebo "Instalovat"</li>
      <li>Aplikace se přidá mezi vaše aplikace a funguje i bez internetu</li>
    </ol>
  </div>
</FaqAccordion>

<FaqAccordion>
  <div slot="question">Co všechno funguje offline?</div>
  <div slot="answer">
    <p>Offline funguje:</p>
    <ul>
      <li>Kompletní itinerář všech bodů na trase</li>
      <li>Detailní informace o službách (ubytování, jídlo, doprava)</li>
      <li>Filtrování bodů podle kategorií</li>
      <li>Uložené obrázky bodů</li>
    </ul>
    <p>Nefunguje nahrávání nových obrázků (vyžaduje internet).</p>
  </div>
</FaqAccordion>

<FaqAccordion>
  <div slot="question">Jak poznám, že aplikace funguje offline?</div>
  <div slot="answer">
    <p>Při načtení aplikace se zobrazí zpráva "Aplikace je připravena pro offline použití".</p>
    <p>Při ztrátě připojení uvidíte notifikaci "Jste offline" - aplikace ale bude fungovat normálně.</p>
    <p>Při návratu připojení se zobrazí "Zpět online".</p>
  </div>
</FaqAccordion>
```

## 5. Implementační kroky

1. **Vytvořit komponenty:**
   - `InstallBanner.astro`
   - `InstallModal.astro`
   - Rozšířit `FaqAccordion.astro` o nové otázky

2. **Aktualizovat BaseLayout:**
   - Přidat logiku pro detekci PWA instalace
   - Vylepšit toastery s ikonami

3. **Přidat do homepage:**
   - InstallBanner pod hero sekcí

4. **Vytvořit blog článek:**
   - Nová stránka `blog/offline-pruvodce.astro`

5. **Testování:**
   - Offline režim v DevTools
   - Instalace na různých zařízeních
   - UX testování instrukcí

## 6. Metriky úspěchu
- % uživatelů, kteří nainstalují PWA
- % offline relací
- Feedback z FAQ/blogu

Tento návrh zajistí, že návštěvníci snadno pochopí výhody offline režimu a budou vědět, jak aplikaci nainstalovat.