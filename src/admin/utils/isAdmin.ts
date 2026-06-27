import { ADMIN_EMAILS } from "../config/adminUsers";

export function isAdmin(email?: string | null) {
  if (!email) {
    return false;
  }

  return ADMIN_EMAILS.includes(email.toLowerCase());
}
