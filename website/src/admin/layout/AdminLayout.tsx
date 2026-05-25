import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

import FaqSection from "../sections/FAQSection";
import PostsSection from "../sections/PostsSection";
import SettingsSection from "../sections/SettingsSection";

import type { AdminSection } from "../types";

interface AdminLayoutProps {
  activeSection: AdminSection;

  onSectionChange: (
    section: AdminSection
  ) => void;
}

export default function AdminLayout({
  activeSection,
  onSectionChange,
}: AdminLayoutProps) {
  function renderSection() {
    switch (activeSection) {
      case "faq":
        return <FaqSection />;

      case "posts":
        return <PostsSection />;

      case "settings":
        return <SettingsSection />;

      default:
        return <FaqSection />;
    }
  }

  return (
    <>
      {/* MOBILE NAV */}

      <MobileNav
        activeSection={activeSection}
        onSectionChange={
          onSectionChange
        }
      />

      <div className="admin-layout">
        {/* DESKTOP SIDEBAR */}

        <aside className="admin-sidebar">
          <Sidebar
            activeSection={
              activeSection
            }
            onSectionChange={
              onSectionChange
            }
          />
        </aside>

        {/* CONTENT */}

        <main className="admin-content">
          {renderSection()}
        </main>
      </div>
    </>
  );
}