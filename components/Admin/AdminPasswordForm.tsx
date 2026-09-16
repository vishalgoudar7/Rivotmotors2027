"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { changeAdminPasswordAction } from "@/app/admin/actions";

export function AdminPasswordForm() {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const field = (name: string, label: string, autoComplete: string) => (
    <label>{label}<span className="adminPasswordField"><input type={visible[name] ? "text" : "password"} name={name} minLength={name === "currentPassword" ? undefined : 8} autoComplete={autoComplete} required /><button type="button" aria-label={`${visible[name] ? "Hide" : "Show"} ${label.toLowerCase()}`} onClick={() => setVisible((state) => ({ ...state, [name]: !state[name] }))}>{visible[name] ? <EyeOff /> : <Eye />}</button></span></label>
  );
  return <form className="adminSettingsForm" action={changeAdminPasswordAction}>{field("currentPassword","Current Password","current-password")}{field("newPassword","New Password","new-password")}{field("confirmPassword","Confirm New Password","new-password")}<button type="submit">Change Password</button><style>{`.adminPasswordField{position:relative;display:block}.adminPasswordField input{padding-right:48px}.adminPasswordField button{position:absolute;top:5px;right:5px;display:grid;width:38px;height:38px;place-items:center;border:0;background:transparent;color:#aaa;cursor:pointer}.adminPasswordField svg{width:18px;height:18px}`}</style></form>;
}
