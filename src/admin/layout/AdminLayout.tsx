import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

import FaqSection from "../sections/FAQSection";
import PointsSection from "../sections/PointsSection";
import PostsSection from "../sections/PostsSection";
import SettingsSection from "../sections/SettingsSection";

import type { AdminSection } from "../types";

interface AdminLayoutProps {
  activeSection: AdminSection;

  onSectionChange: (section: AdminSection) => void;
  onLogout: () => void;
}

export default function AdminLayout({
  activeSection,
  onSectionChange,
  onLogout,
}: AdminLayoutProps) {
  function renderSection() {
    switch (activeSection) {
      case "faq":
        return <FaqSection />;

      case "posts":
        return <PostsSection />;

      case "settings":
        return <SettingsSection />;

      case "points":
        return <PointsSection />;

      default:
        return <PointsSection />;
    }
  }

  return (
    <>
      {/* MOBILE NAV */}

      <MobileNav
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        onLogout={onLogout}
      />

      <div className="admin-layout">
        {/* DESKTOP SIDEBAR */}

        <aside className="admin-sidebar">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            onLogout={onLogout}
          />
        </aside>

        {/* CONTENT */}

        <main className="admin-content">{renderSection()}</main>
      </div>
    </>
  );
}
