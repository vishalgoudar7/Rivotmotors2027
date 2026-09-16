import { redirect } from "next/navigation";
import { AdminShell } from "@/components/Admin/AdminShell";
import { AdminPasswordForm } from "@/components/Admin/AdminPasswordForm";
import { AdminUsersManager } from "@/components/Admin/AdminUsersManager";
import { updateAdminAccountAction } from "../actions";
import { getAdminUsers, getCurrentAdmin } from "../_lib/settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ section?: string; success?: string; error?: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const users = await getAdminUsers();
  const query = await searchParams;
  const errors: Record<string, string> = {
    invalid: "Enter a valid name and login email.",
    duplicate: "That login email is already in use.",
    current: "Current password is incorrect.",
    length: "New password must contain at least 8 characters.",
    mismatch: "New password and confirmation do not match.",
    "user-invalid": "Enter a valid user name and email.",
    "user-password": "The user password must contain at least 8 characters.",
    "user-duplicate": "A user with that email already exists.",
    "user-self-delete": "You cannot delete your own account.",
    "user-last": "The last administrator cannot be deleted.",
    "user-missing": "That user no longer exists.",
  };
  const successes: Record<string,string> = { "user-created": "User created successfully.", "user-deleted": "User deleted successfully.", "user-password": "User password changed successfully." };
  const successText = successes[query.success || ""] || (query.section === "password" ? "Password changed successfully." : "Account updated successfully. Your session remains active.");

  return (
    <AdminShell active={query.section || "settings"} title="Settings" description="Manage administrator account information, notifications, and security from one page.">
      {query.success ? <div className="adminSettingsNotice">{successText}</div> : null}
      {query.error ? <div className="adminSettingsNotice error">{errors[query.error] || "Unable to save changes."}</div> : null}
      <div className="adminAllSettings">
        <section className="adminSettingsCard" id="users">
          <h2>Add Users</h2><p>Create administrators, review existing users, update their passwords, or remove access.</p>
          <AdminUsersManager users={users.map((user) => ({ ...user, created_at: user.created_at?.toISOString() || null }))} currentUserId={admin.id} />
        </section>
        <section className="adminSettingsCard" id="account">
          <h2>Name / Login Email</h2><p>Update the administrator identity and email used to sign in.</p>
          <form className="adminSettingsForm" action={updateAdminAccountAction}><label>Admin Name<input name="name" defaultValue={admin.name} minLength={2} autoComplete="name" required /></label><label>Login Email<input type="email" name="email" defaultValue={admin.email} autoComplete="username" required /></label><button type="submit">Update Account</button></form>
        </section>
        <section className="adminSettingsCard" id="password">
          <h2>Change Password</h2><p>Use a strong password containing at least eight characters.</p><AdminPasswordForm />
        </section>
      </div>
      <style>{`.adminAllSettings{display:grid;gap:20px}.adminAllSettings .adminSettingsCard{scroll-margin-top:20px}`}</style>
    </AdminShell>
  );
}
