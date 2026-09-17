import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LogOut, Package, ShieldCheck, UserPlus, UserRound } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import rivotLogo from "@/asset/images/Newlogo.png";

export function AdminShell({ active, title, description, children }: { active: string; title: string; description: string; children: React.ReactNode }) {
  const item = (href: string, label: string, Icon: typeof LayoutDashboard, key: string) => (
    <Link className={active === key ? "isActive" : ""} href={href}><Icon aria-hidden="true" />{label}</Link>
  );

  return (
    <section className="adminSettingsPage">
      <aside className="adminSettingsSidebar">
        <div className="adminSettingsMark"><Image src={rivotLogo} alt="RIVOT Motors" priority /></div>
        <nav>
          {item("/admin/dashboard", "Dashboard", LayoutDashboard, "dashboard")}
          {item("/admin/orders", "Orders", Package, "orders")}
          <span>Settings</span>
          {item("/admin/settings#users", "Add Users", UserPlus, "users")}
          {item("/admin/settings#account", "Name / Login Email", UserRound, "account")}
          {item("/admin/settings#password", "Change Password", ShieldCheck, "password")}
          <span>Authentication</span>
          <form action={logoutAction}><button type="submit"><LogOut aria-hidden="true" />Logout</button></form>
        </nav>
      </aside>
      <main className="adminSettingsMain">
        <header><p>RIVOT Admin</p><h1>{title}</h1><small>{description}</small></header>
        {children}
      </main>
      <style>{`
        .adminSettingsPage{min-height:100vh;display:grid;grid-template-columns:240px minmax(0,1fr);background:#050505;color:#f7f3ee}
        .adminSettingsSidebar{position:sticky;top:0;height:100vh;padding:18px 14px;border-right:1px solid rgba(255,255,255,.14);background:#070707}
        .adminSettingsMark{display:flex;width:132px;height:44px;margin-bottom:20px;align-items:center}
        .adminSettingsMark img{display:block;width:100%;height:auto;object-fit:contain}
        .adminSettingsSidebar nav{display:grid;gap:7px}.adminSettingsSidebar nav>span{padding:14px 8px 3px;color:#6f6f6f;font-size:10px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}
        .adminSettingsSidebar a,.adminSettingsSidebar button{display:flex;width:100%;min-height:40px;align-items:center;gap:10px;padding:0 11px;border:0;border-radius:6px;background:transparent;color:rgba(255,255,255,.76);font:inherit;font-size:12px;font-weight:800;text-align:left;text-decoration:none;cursor:pointer}
        .adminSettingsSidebar svg{width:17px;height:17px}.adminSettingsSidebar a:hover,.adminSettingsSidebar a.isActive,.adminSettingsSidebar button:hover{background:rgba(239,116,48,.14);color:#fff}.adminSettingsSidebar a.isActive svg{color:#ef7430}
        .adminSettingsMain{width:min(100%,920px);padding:48px 34px 80px}.adminSettingsMain>header{margin-bottom:24px}.adminSettingsMain>header p{margin:0 0 8px;color:#ef7430;font-size:11px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.adminSettingsMain>header h1{margin:0;color:#fff;font-size:clamp(32px,5vw,50px);font-weight:950;line-height:1;letter-spacing:-.045em}.adminSettingsMain>header small{display:block;margin-top:10px;color:#929292;font-size:13px;font-weight:650}
        .adminSettingsCard{padding:24px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:#171717;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}.adminSettingsCard h2{margin:0 0 6px;color:#fff;font-size:18px}.adminSettingsCard>p{margin:0 0 22px;color:#929292;font-size:12px}.adminSettingsForm{display:grid;gap:17px}.adminSettingsForm label{display:grid;gap:8px;color:#dedede;font-size:12px;font-weight:850}.adminSettingsForm input{width:100%;height:48px;padding:0 14px;border:1px solid rgba(255,255,255,.15);border-radius:7px;background:#0d0d0d;color:#fff;outline:none}.adminSettingsForm input:focus{border-color:#ef7430;box-shadow:0 0 0 3px rgba(239,116,48,.12)}.adminSettingsForm>button{width:max-content;min-height:44px;padding:0 20px;border:0;border-radius:7px;background:#ef7430;color:#fff;font-weight:900;cursor:pointer}.adminSettingsNotice{margin-bottom:16px;padding:12px 14px;border-radius:7px;background:rgba(29,185,84,.16);color:#9ee2b7;font-size:13px;font-weight:800}.adminSettingsNotice.error{background:rgba(216,58,46,.18);color:#ffaaa4}
        @media(max-width:760px){.adminSettingsPage{grid-template-columns:1fr}.adminSettingsSidebar{position:static;height:auto}.adminSettingsSidebar nav{grid-template-columns:repeat(2,minmax(0,1fr))}.adminSettingsSidebar nav>span{grid-column:1/-1}.adminSettingsMain{padding:30px 14px 60px}.adminSettingsCard{padding:18px}.adminSettingsForm>button{width:100%}}
      `}</style>
    </section>
  );
}
