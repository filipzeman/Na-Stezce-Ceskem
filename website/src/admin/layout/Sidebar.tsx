import {
  LayoutDashboard,
  CircleHelp,
  FileText,
  Image,
  Settings,
  LogOut,
} from "lucide-react";

import type { AdminSection } from "../types";

interface SidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  onLogout: () => void;
}

export const navigationItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "faq",
    label: "FAQ",
    icon: CircleHelp,
  },
  {
    key: "posts",
    label: "Články",
    icon: FileText,
  },
  {
    key: "images",
    label: "Obrázky",
    icon: Image,
  },
  {
    key: "settings",
    label: "Nastavení",
    icon: Settings,
  },
] satisfies {
  key: AdminSection;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}[];

export default function Sidebar({
  activeSection,
  onSectionChange,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">

        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                type="button"
                className={`sidebar-link ${
                  activeSection === item.key ? "active" : ""
                }`}
                onClick={() => onSectionChange(item.key)}
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-link logout-link"
          onClick={onLogout}
        >
          <LogOut size={18} />

          <span>Odhlásit se</span>
        </button>
      </div>
    </aside>
  );
}