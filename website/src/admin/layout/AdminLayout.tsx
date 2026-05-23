import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import type { AdminSection } from "../types";

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: AdminSection;
  onChangeSection: (section: AdminSection) => void;
}

export default function AdminLayout({
  children,
  activeSection,
  onChangeSection,
}: AdminLayoutProps) {
  return (
    <div className="admin-layout">
      <Sidebar
        activeSection={activeSection}
        onChangeSection={onChangeSection}
      />

      <div className="admin-main">
        <Topbar activeSection={activeSection} />

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
