import { LogOut } from 'lucide-react';

import type { AdminSection } from "../types";
import { navigationItems } from "./Sidebar";

interface MobileNavProps {
  activeSection: AdminSection;
  onLogout: () => void;
  onSectionChange: (
    section: AdminSection
  ) => void;
}

export default function MobileNav({
  activeSection,
  onSectionChange,
  onLogout,
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
      <button
            className={'mobile-admin-link logout-link'}
            onClick={onLogout}
          >
  
            <LogOut size={18}/>
            <span className="sr-only">Odhlásit se</span>
          </button> 
    </nav>
  );
}