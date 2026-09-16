import { redirect } from "next/navigation";
import { AdminShell } from "@/components/Admin/AdminShell";
import { updateAdminAccountAction } from "../../actions";
import { getCurrentAdmin } from "../../_lib/settings";

export const dynamic = "force-dynamic";
export default async function AccountSettingsPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const query = await searchParams;
  const message = query.error === "duplicate" ? "That login email is already in use." : "Enter a valid name and email address.";
  return <AdminShell active="account" title="Account Settings" description="Manage administrator identity and login information.">{query.success ? <div className="adminSettingsNotice">Account updated successfully. Your session remains active.</div> : null}{query.error ? <div className="adminSettingsNotice error">{message}</div> : null}<section className="adminSettingsCard"><h2>Administrator account</h2><p>These details are used to identify and authenticate the administrator.</p><form className="adminSettingsForm" action={updateAdminAccountAction}><label>Admin Name<input name="name" defaultValue={admin.name} minLength={2} autoComplete="name" required /></label><label>Login Email<input type="email" name="email" defaultValue={admin.email} autoComplete="username" required /></label><button type="submit">Update Account</button></form></section></AdminShell>;
}
