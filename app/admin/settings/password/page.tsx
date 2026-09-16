import { redirect } from "next/navigation";
import { AdminShell } from "@/components/Admin/AdminShell";
import { AdminPasswordForm } from "@/components/Admin/AdminPasswordForm";
import { getCurrentAdmin } from "../../_lib/settings";

export const dynamic = "force-dynamic";
export default async function PasswordSettingsPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  if (!await getCurrentAdmin()) redirect("/admin/login");
  const query = await searchParams;
  const errors: Record<string,string> = { current: "Current password is incorrect.", length: "New password must contain at least 8 characters.", mismatch: "New password and confirmation do not match." };
  return <AdminShell active="password" title="Change Password" description="Update the password used to access the RIVOT administration panel.">{query.success ? <div className="adminSettingsNotice">Password changed successfully.</div> : null}{query.error ? <div className="adminSettingsNotice error">{errors[query.error] || "Unable to change password."}</div> : null}<section className="adminSettingsCard"><h2>Security</h2><p>Use a strong password that you do not reuse elsewhere.</p><AdminPasswordForm /></section></AdminShell>;
}
