import { useEffect, useState } from "react";

import AdminLayout from "./layout/AdminLayout";
import LoginForm from "./components/auth/LoginForm";

import type { AdminSection } from "./types";
import { getSession } from "./services/authService";

import "./styles/admin.css";

export default function AdminApp() {
 const [session, setSession] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

   const [activeSection, setActiveSection] =
    useState<AdminSection>("faq");

  async function checkSession() {
    try {
      const session =
        await getSession();

      setSession(session);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);
  
 if (loading) {
    return (
      <div className="admin-loading">
        <p>Načítám administraci…</p>
      </div>
    );
  }

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
    />
  );
}