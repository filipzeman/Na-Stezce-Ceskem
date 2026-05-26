import { useEffect, useState } from "react";

import AdminLayout from "./layout/AdminLayout";
import LoginForm from "./components/auth/LoginForm";

import type { AdminSection } from "./types";
import { getSession, logout } from "./services/authService";

import "./styles/admin.css";

export default function AdminApp() {
 const [session, setSession] =
    useState<any>(null);

   const [activeSection, setActiveSection] =
    useState<AdminSection>("faq");

    async function handleLogout() {
      logout();

      setSession(null);
    }

  async function checkSession() {
    try {
      const session =
        await getSession();

      setSession(session);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  // NOT LOGGED IN
  if (!session) {
    return (
      <LoginForm
        onSuccess={checkSession}
      />
    );
  }

   return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={
        setActiveSection
      }
      onLogout={handleLogout}
    />
  );
}