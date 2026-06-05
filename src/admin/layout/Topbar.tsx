import type { AdminSection } from "../types";

interface TopbarProps {
  activeSection: AdminSection;
}

const titles: Record<AdminSection, string> = {
  dashboard: "Dashboard",
  faq: "FAQ",
  posts: "Články",
  images: "Obrázky",
  settings: "Nastavení",
};

export default function Topbar({
  activeSection,
}: TopbarProps) {
  return (
    <header className="topbar">
      <h1>{titles[activeSection]}</h1>
    </header>
  );
}