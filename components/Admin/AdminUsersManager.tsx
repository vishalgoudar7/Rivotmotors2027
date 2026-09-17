"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, Trash2, UserPlus } from "lucide-react";
import { changeUserPasswordAction, createAdminUserAction, deleteAdminUserAction } from "@/app/admin/actions";

type AdminUser = { id: number; name: string; email: string; created_at: string | null };

function PasswordInput({ name = "password" }: { name?: string }) {
  const [visible, setVisible] = useState(false);
  return <span className="adminUserPassword"><input type={visible ? "text" : "password"} name={name} minLength={8} autoComplete="new-password" placeholder="Minimum 8 characters" required /><button type="button" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible((value) => !value)}>{visible ? <EyeOff /> : <Eye />}</button></span>;
}

export function AdminUsersManager({ users, currentUserId }: { users: AdminUser[]; currentUserId: number }) {
  return <>
    <form className="adminSettingsForm adminCreateUser" action={createAdminUserAction}>
      <div className="adminUserFormGrid"><label>Name<input name="name" minLength={2} autoComplete="name" required /></label><label>Email<input type="email" name="email" autoComplete="email" required /></label><label>Password<PasswordInput /></label></div>
      <button type="submit"><UserPlus /> Create User</button>
    </form>
    <div className="adminUserList">
      {users.map((user) => <article key={user.id}>
        <div className="adminUserIdentity"><span>{user.name.slice(0, 1).toUpperCase()}</span><div><b>{user.name}{user.id === currentUserId ? " (You)" : ""}</b><small>{user.email}</small></div></div>
        <form action={changeUserPasswordAction}><input type="hidden" name="userId" value={user.id} /><PasswordInput /><button className="adminUserPasswordButton" type="submit"><KeyRound /> Change Password</button></form>
        <form action={deleteAdminUserAction} onSubmit={(event) => { if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) event.preventDefault(); }}><input type="hidden" name="userId" value={user.id} /><button className="adminUserDelete" type="submit" disabled={user.id === currentUserId} title={user.id === currentUserId ? "You cannot delete your own account" : "Delete user"}><Trash2 /> Delete</button></form>
      </article>)}
    </div>
    <style>{`
      .adminCreateUser{padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.12)}.adminUserFormGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.adminCreateUser>button{display:flex;align-items:center;gap:8px}.adminCreateUser>button svg{width:17px;height:17px}.adminUserPassword{position:relative;display:block;min-width:0}.adminUserPassword input{width:100%;height:48px;padding:0 46px 0 14px;border:1px solid rgba(255,255,255,.15);border-radius:7px;background:#0d0d0d;color:#fff;font-size:13px;outline:none}.adminUserPassword input::placeholder{color:#777;opacity:1}.adminUserPassword input:focus{border-color:#ef7430;box-shadow:0 0 0 3px rgba(239,116,48,.12)}.adminUserPassword>button{position:absolute;top:5px;right:5px;display:grid;width:38px;height:38px;place-items:center;border:0;background:transparent;color:#999;cursor:pointer}.adminUserPassword>button:hover{color:#ef7430}.adminUserPassword svg{width:17px;height:17px}.adminUserList{display:grid;gap:10px;margin-top:20px}.adminUserList article{display:grid;grid-template-columns:minmax(190px,1fr) minmax(280px,1.4fr) auto;gap:14px;align-items:center;padding:14px;border:1px solid rgba(255,255,255,.11);border-radius:9px;background:#101010}.adminUserIdentity{display:flex;align-items:center;gap:11px}.adminUserIdentity>span{display:grid;width:38px;height:38px;place-items:center;border-radius:50%;background:rgba(239,116,48,.16);color:#ef7430;font-weight:950}.adminUserIdentity b,.adminUserIdentity small{display:block}.adminUserIdentity b{color:#fff;font-size:13px}.adminUserIdentity small{margin-top:3px;color:#8f8f8f;font-size:11px}.adminUserList article>form{display:flex;min-width:0;gap:8px}.adminUserList article>form .adminUserPassword{flex:1}.adminUserPasswordButton,.adminUserDelete{display:inline-flex;min-height:48px;align-items:center;justify-content:center;gap:7px;padding:0 12px;border:1px solid rgba(255,255,255,.15);border-radius:7px;background:#191919;color:#fff;font-size:11px;font-weight:850;cursor:pointer}.adminUserPasswordButton svg,.adminUserDelete svg{width:15px;height:15px}.adminUserDelete{border-color:rgba(216,58,46,.35);color:#ffaaa4}.adminUserDelete:disabled{opacity:.35;cursor:not-allowed}@media(max-width:900px){.adminUserFormGrid{grid-template-columns:1fr}.adminUserList article{grid-template-columns:1fr}.adminUserList article>form{width:100%}.adminUserDelete{width:100%}}@media(max-width:480px){.adminUserList article>form{display:grid}.adminUserPasswordButton{width:100%}}
    `}</style>
  </>;
}
