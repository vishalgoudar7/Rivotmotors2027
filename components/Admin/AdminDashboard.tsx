import Link from "next/link";
import { OrdersTable } from "@/components/Admin/OrdersTable";
import { orderValue, type AdminOrder, type OrdersResult } from "@/app/admin/_lib/orders";

function formatAmount(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount) ? `Rs ${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : value;
}

function getStatus(order: AdminOrder) {
  const value = orderValue(order, ["payment_status", "status", "statid"], "PENDING");
  return value === "1" ? "Confirmed" : value;
}

function getOrderId(order: AdminOrder) {
  return orderValue(order, ["order_id", "orderId", "trackId", "id"]);
}

function isSuccess(status: string) {
  const normalized = status.toLowerCase();
  return normalized.includes("success") || normalized.includes("confirm");
}

function isFailed(status: string) {
  return status.toLowerCase().includes("fail");
}

function statusClass(status: string) {
  if (isSuccess(status)) return "success";
  if (isFailed(status)) return "failed";
  return "pending";
}

function modelStats(orders: AdminOrder[]) {
  const counts = new Map<string, number>();

  for (const order of orders) {
    const model = orderValue(order, ["model", "product_name", "product", "name"], "Unknown");
    counts.set(model, (counts.get(model) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([model, count]) => ({ model, count }));
}

export function AdminDashboard({
  result,
  search,
  status,
  message,
}: {
  result: OrdersResult;
  search: string;
  status: string;
  message?: string;
}) {
  const successfulOrders = result.orders.filter((order) => isSuccess(getStatus(order)));
  const failedOrders = result.orders.filter((order) => isFailed(getStatus(order)));
  const pendingOrders = Math.max(0, result.totalRecords - successfulOrders.length - failedOrders.length);
  const revenue = successfulOrders.reduce((sum, order) => sum + Number(orderValue(order, ["amount"], "0")), 0);
  const models = modelStats(result.orders);
  const maxModelCount = Math.max(1, ...models.map((model) => model.count));

  return (
    <section className="adminHome">
      <aside className="adminSidebar">
        <div className="adminMark">R</div>
        <nav>
          <Link className="isActive" href="/admin/dashboard">Home</Link>
          <span>Manage</span>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/blog">Blog Management</Link>
          <Link href="/forum">Forum Management</Link>
          <span>System</span>
          <Link href="/admin/dashboard">Settings</Link>
        </nav>
      </aside>

      <main className="adminMain">
        <header className="adminTopbar">
          <div>
            <p>RIVOT Admin</p>
            <h1>Dashboard Overview</h1>
            <span>Monitor orders, payments, activity, and admin shortcuts from one place.</span>
          </div>
          <div className="adminTopActions">
            <Link href="/book-now">Add Order</Link>
            <Link href="/admin/orders">Manage Orders</Link>
          </div>
        </header>

        {message === "deleted" ? <div className="adminNotice">Order deleted successfully.</div> : null}
        {result.error ? <div className="adminNotice warning">{result.error}</div> : null}

        <section className="adminMetrics">
          <article>
            <small>Total Orders</small>
            <strong>{result.totalRecords}</strong>
            <span>All recorded orders</span>
          </article>
          <article>
            <small>Successful Payments</small>
            <strong>{successfulOrders.length}</strong>
            <span>{result.orders.length ? Math.round((successfulOrders.length / result.orders.length) * 100) : 0}% success rate</span>
          </article>
          <article>
            <small>Pending Payments</small>
            <strong>{pendingOrders}</strong>
            <span>Need follow-up</span>
          </article>
          <article>
            <small>Recorded Revenue</small>
            <strong>{formatAmount(String(revenue))}</strong>
            <span>Numeric successful records</span>
          </article>
        </section>

        <section className="adminGrid">
          <article className="adminPanel quick">
            <h2>Quick Actions</h2>
            <Link href="/book-now">Add Order</Link>
            <Link href="/admin/orders">Manage Orders</Link>
            <Link href="/blog">Blog Management</Link>
            <Link href="/admin/dashboard">Settings</Link>

            <div className="miniStats">
              <span>
                <b>{result.orders.length}</b>
                Today Orders
              </span>
              <span>
                <b>{successfulOrders.length}</b>
                Success Ratio
              </span>
              <span>
                <b>{pendingOrders}</b>
                Pending Orders
              </span>
              <span>
                <b>{formatAmount(String(revenue))}</b>
                Revenue
              </span>
            </div>
          </article>

          <article className="adminPanel insights">
            <div className="panelHeader">
              <h2>Booking Insights</h2>
              <span>Latest actions from orders, payments, and users</span>
            </div>
            <div className="insightList">
              <div>
                <b>{pendingOrders}</b>
                <span>
                  <strong>Orders not completed</strong>
                  Customers who started booking but did not finish payment.
                </span>
              </div>
              <div>
                <b>{successfulOrders.length}</b>
                <span>
                  <strong>Payments completed</strong>
                  Successful payment confirmations received from gateway.
                </span>
              </div>
              <div>
                <b>{failedOrders.length}</b>
                <span>
                  <strong>Payments failed</strong>
                  Transactions that returned from gateway without success.
                </span>
              </div>
              <div>
                <b>{formatAmount(String(revenue))}</b>
                <span>
                  <strong>Recorded revenue</strong>
                  Total successful numeric collection from paid orders.
                </span>
              </div>
            </div>
          </article>
        </section>

        <section className="adminGrid lower">
          <OrdersTable result={result} search={search} status={status} />

          <article className="adminPanel models">
            <h2>Top Ordered Models</h2>
            {models.length > 0 ? (
              models.map((model) => (
                <div className="modelRow" key={model.model}>
                  <span>{model.model}</span>
                  <i>
                    <b style={{ width: `${Math.max(8, (model.count / maxModelCount) * 100)}%` }} />
                  </i>
                  <em>{model.count}</em>
                </div>
              ))
            ) : (
              <p>No model data yet.</p>
            )}
          </article>
        </section>
      </main>

      <style>{`
        .adminHome {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 220px 1fr;
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
          display: grid;
          width: 42px;
          height: 42px;
          margin-bottom: 18px;
          place-items: center;
          border: 1px solid rgba(239, 116, 48, .55);
          border-radius: 10px;
          color: #ef7430;
          font-size: 19px;
          font-weight: 950;
        }

        .adminSidebar nav {
          display: grid;
          gap: 8px;
        }

        .adminSidebar a,
        .adminSidebar span {
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

        .adminSidebar span {
          min-height: 26px;
          padding: 10px 4px 0;
          color: #6f6f6f;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .adminSidebar a.isActive,
        .adminSidebar a:hover {
          background: rgba(239, 116, 48, .14);
          color: #fff;
        }

        .adminMain {
          width: min(100%, 1180px);
          padding: 48px 28px 80px;
        }

        .adminTopbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
        }

        .adminTopbar p {
          margin: 0 0 8px;
          color: #ef7430;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .adminTopbar h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 950;
          line-height: 1;
          letter-spacing: -.045em;
        }

        .adminTopbar span,
        .panelHeader span,
        .adminMetrics article span,
        .models p {
          color: #8d8d8d;
          font-size: 12px;
          font-weight: 700;
        }

        .adminTopActions {
          display: flex;
          gap: 10px;
        }

        .adminTopActions a,
        .quick > a,
        .panelHeader a,
        .adminFilters button,
        .orderTable button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 38px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, .18);
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
        }

        .adminTopActions a:first-child,
        .quick > a:first-of-type,
        .adminFilters button {
          border-color: #ef7430;
          background: #ef7430;
        }

        .adminTopActions a {
          padding: 0 18px;
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

        .adminMetrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 18px;
        }

        .adminMetrics article,
        .adminPanel {
          border: 1px solid rgba(255, 255, 255, .14);
          border-radius: 10px;
          background: #1a1a1a;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
        }

        .adminMetrics article {
          display: grid;
          gap: 5px;
          min-height: 118px;
          padding: 18px;
          border-top-color: rgba(239, 116, 48, .7);
        }

        .adminMetrics small {
          color: #a1a1a1;
          font-size: 11px;
          font-weight: 800;
        }

        .adminMetrics strong {
          color: #fff;
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 950;
          line-height: 1;
        }

        .adminGrid {
          display: grid;
          grid-template-columns: minmax(270px, .75fr) minmax(0, 1.55fr);
          gap: 18px;
          margin-bottom: 18px;
        }

        .adminGrid.lower {
          grid-template-columns: minmax(0, 1.45fr) minmax(260px, .7fr);
        }

        .adminPanel {
          padding: 18px;
        }

        .adminPanel h2 {
          margin: 0 0 14px;
          color: #fff;
          font-size: 16px;
          font-weight: 950;
        }

        .quick {
          display: grid;
          gap: 10px;
        }

        .quick > a {
          min-height: 42px;
        }

        .miniStats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 8px;
        }

        .miniStats span {
          min-height: 66px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, .12);
          border-radius: 8px;
          color: #8d8d8d;
          font-size: 11px;
          font-weight: 750;
        }

        .miniStats b {
          display: block;
          margin-bottom: 4px;
          color: #fff;
          font-size: 15px;
          font-weight: 950;
        }

        .panelHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }

        .panelHeader a {
          min-height: 34px;
          padding: 0 14px;
        }

        .insightList {
          display: grid;
        }

        .insightList div {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, .1);
        }

        .insightList div:last-child {
          border-bottom: 0;
        }

        .insightList b {
          display: grid;
          min-height: 36px;
          place-items: center;
          border-radius: 9px;
          background: rgba(239, 116, 48, .15);
          color: #ef7430;
          font-size: 14px;
          font-weight: 950;
        }

        .insightList strong {
          display: block;
          color: #fff;
          font-size: 13px;
          font-weight: 950;
        }

        .insightList span {
          color: #8d8d8d;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.35;
        }

        .adminFilters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .adminFilters input,
        .adminFilters select {
          min-height: 36px;
          border: 1px solid rgba(255, 255, 255, .14);
          border-radius: 6px;
          background: #121212;
          color: #fff;
          padding: 0 10px;
          font-size: 12px;
        }

        .adminFilters input {
          flex: 1 1 190px;
        }

        .adminFilters button {
          border: 0;
          padding: 0 14px;
          cursor: pointer;
        }

        .orderTable {
          overflow-x: auto;
        }

        .orderTable table {
          width: 100%;
          min-width: 820px;
          border-collapse: collapse;
        }

        .orderTable th,
        .orderTable td {
          padding: 12px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, .1);
          color: #ddd;
          font-size: 12px;
          font-weight: 750;
          text-align: left;
        }

        .orderTable th {
          color: #8d8d8d;
          font-size: 10px;
          font-weight: 950;
          text-transform: uppercase;
        }

        .orderTable button {
          min-height: 28px;
          border: 0;
          padding: 0 10px;
          background: rgba(216, 58, 46, .9);
          cursor: pointer;
        }

        .adminStatus {
          display: inline-flex;
          align-items: center;
          min-height: 24px;
          padding: 0 10px;
          border-radius: 999px;
          color: #fff;
          font-size: 10px;
          font-weight: 950;
        }

        .adminStatus.success {
          background: rgba(29, 185, 84, .35);
          color: #9ee2b7;
        }

        .adminStatus.failed {
          background: rgba(216, 58, 46, .38);
          color: #ffaaa4;
        }

        .adminStatus.pending {
          background: rgba(255, 255, 255, .18);
          color: #ddd;
        }

        .adminCount {
          margin: 14px 0 0;
          color: #8d8d8d;
          font-size: 12px;
          font-weight: 800;
          text-align: center;
        }

        .modelRow {
          display: grid;
          grid-template-columns: 90px 1fr 38px;
          gap: 10px;
          align-items: center;
          margin-bottom: 15px;
          color: #fff;
          font-size: 12px;
          font-weight: 900;
        }

        .modelRow i {
          display: block;
          height: 7px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, .12);
        }

        .modelRow b {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #ef7430;
        }

        .modelRow em {
          color: #8d8d8d;
          font-style: normal;
          text-align: right;
        }

        @media (max-width: 1080px) {
          .adminHome {
            grid-template-columns: 1fr;
          }

          .adminSidebar {
            position: static;
            height: auto;
          }

          .adminSidebar nav {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .adminMetrics,
          .adminGrid,
          .adminGrid.lower {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 760px) {
          .adminMain {
            padding: 28px 14px 60px;
          }

          .adminTopbar {
            flex-direction: column;
          }

          .adminTopActions,
          .adminMetrics,
          .adminGrid,
          .adminGrid.lower,
          .miniStats,
          .adminSidebar nav {
            grid-template-columns: 1fr;
          }

          .adminTopActions {
            display: grid;
            width: 100%;
          }

          .adminTopActions a {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
