
import type { AdminSection } from "../types";
import { navigationItems } from "./Sidebar";

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
  

  return (
    <nav className="mobile-admin-nav">
      {navigationItems.map((item) => {
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

            <span className="sr-only">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}