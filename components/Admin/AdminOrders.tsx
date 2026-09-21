import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/app/admin/actions";
import { OrdersTable } from "@/components/Admin/OrdersTable";
import type { AdminOrder, OrdersResult } from "@/app/admin/_lib/orders";
import rivotLogo from "@/asset/images/Newlogo.png";
import { FileText, LayoutDashboard, LogOut, MessageSquare, Package, Settings } from "lucide-react";

export function AdminOrders({
  result,
  exportOrders,
  search,
  status,
  message,
}: {
  result: OrdersResult;
  exportOrders: AdminOrder[];
  search: string;
  status: string;
  message?: string;
}) {
  return (
    <section className="adminOrdersPage">
      <aside className="adminSidebar">
        <div className="adminMark"><Image src={rivotLogo} alt="RIVOT Motors" priority /></div>
        <nav>
          <Link href="/admin/dashboard"><LayoutDashboard aria-hidden="true" />Home</Link>
          <span>Manage</span>
          <Link className="isActive" href="/admin/orders"><Package aria-hidden="true" />Orders</Link>
          <Link href="/admin/blogs"><FileText aria-hidden="true" />Blog Management</Link>
          <Link href="/admin/forum"><MessageSquare aria-hidden="true" />Forum Management</Link>
          <Link href="/admin/forum/categories"><MessageSquare aria-hidden="true" />Forum Categories</Link>
          <Link href="/admin/forum/replies"><MessageSquare aria-hidden="true" />Forum Replies</Link>
          <span>System</span>
          <Link href="/admin/settings"><Settings aria-hidden="true" />Settings</Link>
          <span>Authentication</span>
          <form action={logoutAction}><button type="submit"><LogOut aria-hidden="true" />Logout</button></form>
        </nav>
      </aside>

      <main className="adminOrdersMain">
        <header className="adminOrdersHeader">
          <div className="adminOrdersActions">
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/book-now">Add Order</Link>
          </div>
        </header>

        {message === "deleted" ? <div className="adminNotice">Order deleted successfully.</div> : null}
        {result.error ? <div className="adminNotice warning">{result.error}</div> : null}

        <OrdersTable result={result} exportOrders={exportOrders} search={search} status={status} />
      </main>

      <style>{`
        .adminOrdersPage {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          background: #050505;
          color: #f7f3ee;
        }

        .adminSidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 16px 14px;
          border-right: 1px solid rgba(255, 255, 255, .14);
          background: #070707;
        }

        .adminMark {
          display: flex;
          width: 132px;
          height: 42px;
          margin-bottom: 18px;
          align-items: center;
        }

        .adminMark img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .adminSidebar nav {
          display: grid;
          gap: 8px;
        }

        .adminSidebar a,
        .adminSidebar span,
        .adminSidebar button {
          display: flex;
          align-items: center;
          min-height: 36px;
          padding: 0 12px;
          border-radius: 5px;
          color: rgba(255, 255, 255, .78);
          font-size: 13px;
          font-weight: 850;
          text-decoration: none;
        }

        .adminSidebar button {
          width: 100%;
          border: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .adminSidebar a,
        .adminSidebar button {
          gap: 10px;
        }

        .adminSidebar a svg,
        .adminSidebar button svg {
          width: 17px;
          height: 17px;
          flex: 0 0 17px;
          stroke-width: 1.8;
        }

        .adminSidebar a.isActive svg {
          color: #ef7430;
        }

        .adminSidebar .adminNavDisabled {
          color: rgba(255,255,255,.38);
          cursor: not-allowed;
        }

        .adminSidebar .adminNavDisabled:hover {
          background: transparent;
          color: rgba(255,255,255,.38);
        }

        .adminSidebar span {
          min-height: 26px;
          padding: 10px 4px 0;
          color: #6f6f6f;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .adminSidebar a.isActive,
        .adminSidebar a:hover,
        .adminSidebar button:hover {
          background: rgba(239, 116, 48, .14);
          color: #fff;
        }

        .adminOrdersMain {
          width: min(100%, 1480px);
          padding: 48px 28px 80px;
        }

        .adminOrdersHeader {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 20px;
          margin-bottom: 24px;
        }

        .adminOrdersHeader p {
          margin: 0 0 8px;
          color: #ef7430;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .adminOrdersHeader h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(34px, 5vw, 56px);
          font-weight: 950;
          line-height: 1;
          letter-spacing: -.045em;
        }

        .adminOrdersHeader span {
          color: #8d8d8d;
          font-size: 12px;
          font-weight: 700;
        }

        .adminOrdersActions {
          display: flex;
          gap: 10px;
        }

        .adminOrdersActions a {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border: 1px solid rgba(255, 255, 255, .18);
          border-radius: 6px;
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
        }

        .adminOrdersActions a:last-child {
          border-color: #ef7430;
          background: #ef7430;
        }

        .adminNotice {
          margin-bottom: 16px;
          padding: 12px 14px;
          border-radius: 7px;
          background: rgba(29, 185, 84, .18);
          color: #9ee2b7;
          font-weight: 850;
        }

        .adminNotice.warning {
          background: rgba(239, 116, 48, .14);
          color: #ffb084;
        }

        @media (max-width: 1080px) {
          .adminOrdersPage {
            grid-template-columns: 1fr;
          }

          .adminSidebar {
            position: static;
            height: auto;
          }

          .adminSidebar nav {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .adminOrdersMain {
            padding: 28px 14px 60px;
          }

          .adminOrdersHeader {
            flex-direction: column;
          }

          .adminOrdersActions {
            display: grid;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
