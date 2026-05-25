import {
  FileQuestion,
  Newspaper,
  Settings,
} from "lucide-react";
import type { AdminSection } from "../types";

interface MobileNavProps {
  activeSection: AdminSection;

  onSectionChange: (
    section: AdminSection
  ) => void;
}

export default function MobileNav({
  activeSection,
  onSectionChange,
}: MobileNavProps) {
  const items = [
    {
      key: "faq",
      label: "FAQ",
      icon: FileQuestion,
    },
    {
      key: "posts",
      label: "Články",
      icon: Newspaper,
    },
    {
      key: "settings",
      label: "Nastavení",
      icon: Settings,
    },
  ];

  return (
    <nav className="mobile-admin-nav">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            className={`mobile-admin-link ${
              activeSection === item.key
                ? "active"
                : ""
            }`}
            onClick={() =>
              onSectionChange(item.key as AdminSection)
            }
          >
            <Icon size={18} />

            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}