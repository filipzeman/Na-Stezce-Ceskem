import { useState } from "react";

import AdminLayout from "./layout/AdminLayout";

// import DashboardSection from "./sections/DashboardSection";
import FAQSection from "./sections/FAQSection";
// import PostsSection from "./sections/PostsSection";
// import ImagesSection from "./sections/ImagesSection";
import SettingsSection from "./sections/SettingsSection";

import type { AdminSection } from "./types";

import "./styles/admin.css";

export default function AdminApp() {
  const [activeSection, setActiveSection] =
    useState<AdminSection>("dashboard");

  return (
    <AdminLayout
      activeSection={activeSection}
      onChangeSection={setActiveSection}
    >
      {activeSection === "faq" && <FAQSection />}
      {activeSection === "settings" && <SettingsSection />}
      {/* {activeSection === "dashboard" && <DashboardSection />}
      {activeSection === "posts" && <PostsSection />}
      {activeSection === "images" && <ImagesSection />} */}
    
    </AdminLayout>
  );
}