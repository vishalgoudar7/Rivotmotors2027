import Link from "next/link";
import { orderValue, type AdminOrder, type OrdersResult } from "@/app/admin/_lib/orders";
import { OrdersActions, type OrderExportRow } from "@/components/Admin/OrdersActions";
import { AutoSubmitStatus } from "@/components/Admin/AutoSubmitStatus";

function formatAmount(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount) ? `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : value;
}

function formatDate(value: string) {
  if (!value || value === "N/A") return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatus(order: AdminOrder) {
  const value = orderValue(order, ["payment_status", "status", "statid"], "PENDING");
  return value === "1" ? "Confirmed" : value;
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("success") || normalized.includes("confirm")) return "success";
  if (normalized.includes("fail")) return "failed";
  return "pending";
}

function getOrderId(order: AdminOrder) {
  return orderValue(order, ["order_id", "orderId", "trackId", "id"]);
}

export function OrdersTable({
  result,
  exportOrders,
  search,
  status,
}: {
  result: OrdersResult;
  exportOrders?: AdminOrder[];
  search: string;
  status: string;
}) {
  function pageHref(page: number) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    params.set("page", String(page));
    return `/admin/orders?${params.toString()}`;
  }

  const firstPage = Math.max(1, Math.min(result.page - 2, result.totalPages - 4));
  const pageNumbers = Array.from(
    { length: Math.min(5, result.totalPages) },
    (_, index) => firstPage + index,
  );

  const mapRows = (orders: AdminOrder[]): OrderExportRow[] => orders.map((order, index) => {
    const orderId = getOrderId(order) || `#${index + 1}`;
    const model = orderValue(order, ["model", "model_name", "product_name", "productName", "product"], "nx100");
    const productName = orderValue(order, ["product_name", "productName", "product", "model"], "nx100-Gray-Pro");
    const amount = formatAmount(orderValue(order, ["amount"], "0"));
    const color = orderValue(order, ["color", "colour"], "N/A");
    const customer = `${orderValue(order, ["buyer_first_name", "name", "first_name"], "")} ${orderValue(order, ["buyer_last_name", "lastName", "last_name"], "")}`.trim() || "N/A";
    const statusValue = getStatus(order);

    return {
      id: index + 1,
      orderId,
      price: amount,
      model,
      color,
      productName,
      trackId: orderValue(order, ["track_id", "tracking_id", "trackId"], `NX100-PRO-${index + 1}`),
      description: orderValue(order, ["productDescription", "product_description"], productName),
      transactionId: orderValue(order, ["transaction_id", "payment_id", "txn_id"], "Not paid"),
      customer,
      date: formatDate(orderValue(order, ["created_at", "createdAt", "booking_date", "date"], "N/A")),
      mobile: orderValue(order, ["mobile", "phone", "phone_number", "buyer_phone"], "N/A"),
      city: orderValue(order, ["city", "buyer_city"], "N/A"),
      state: orderValue(order, ["state", "buyer_state"], "N/A"),
      status: statusValue,
    };
  });
  const rows = mapRows(result.orders);
  const allExportRows = mapRows(exportOrders || result.orders);

  return (
    <section className="ordersSection" id="orders">
      <div className="ordersHeader">
        <div className="ordersTitleWrap">
          <span className="ordersIcon">👥</span>
          <h2>Orders</h2>
        </div>

        <OrdersActions rows={allExportRows} />
      </div>

      <form className="orderFilterBar">
        <input name="search" defaultValue={search} placeholder="Search orders" />
        <AutoSubmitStatus defaultValue={status} />
        <button type="submit">Filter</button>
      </form>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th className="narrowCell"><span className="rowCheck" /></th>
              <th>ID</th>
              <th>Price</th>
              <th>Model</th>
              <th>Color</th>
              <th>Product Name</th>
              <th>Track ID</th>
              <th>Order ID</th>
              <th>Product Description</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Mobile Number</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={`${row.orderId}-${row.id}`}>
                  <td className="narrowCell"><span className="rowCheck active" /></td>
                  <td>{row.id}</td>
                  <td>{row.price}</td>
                  <td>{row.model}</td>
                  <td>{row.color}</td>
                  <td>{row.productName}</td>
                  <td>{row.trackId}</td>
                  <td>{row.orderId}</td>
                  <td>{row.description}</td>
                  <td>{row.transactionId}</td>
                  <td>
                    <span className={`statusTag ${statusClass(row.status)}`}>{row.status}</span>
                  </td>
                  <td>{row.customer}</td>
                  <td>{row.date}</td>
                  <td>{row.mobile}</td>
                  <td>{row.city}</td>
                  <td>{row.state}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={16} className="emptyCell">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {result.totalPages > 1 ? (
        <nav className="ordersPagination" aria-label="Orders pagination">
          <Link
            href={pageHref(result.page - 1)}
            className={result.page === 1 ? "isDisabled" : ""}
            aria-disabled={result.page === 1}
            tabIndex={result.page === 1 ? -1 : undefined}
          >
            Previous
          </Link>
          {firstPage > 1 ? <span aria-hidden="true">…</span> : null}
          {pageNumbers.map((page) => (
            <Link
              key={page}
              href={pageHref(page)}
              className={page === result.page ? "isActive" : ""}
              aria-current={page === result.page ? "page" : undefined}
            >
              {page}
            </Link>
          ))}
          {pageNumbers.at(-1) !== result.totalPages ? <span aria-hidden="true">…</span> : null}
          <Link
            href={pageHref(result.page + 1)}
            className={result.page === result.totalPages ? "isDisabled" : ""}
            aria-disabled={result.page === result.totalPages}
            tabIndex={result.page === result.totalPages ? -1 : undefined}
          >
            Next
          </Link>
        </nav>
      ) : null}

      <style>{`
        .ordersSection {
          background: rgba(19, 19, 20, 0.96);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 18px 18px 14px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
        }

        .ordersHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }

        .ordersTitleWrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ordersIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          color: #f4a263;
        }

        .ordersTitleWrap h2 {
          margin: 0;
          color: #f3f3f3;
          font-size: clamp(1.6rem, 2vw, 2.3rem);
          letter-spacing: -0.04em;
        }

        .ordersActions {
          position: relative;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
        }

        .ordersActionMessage {
          position: absolute;
          top: calc(100% + 7px);
          right: 0;
          z-index: 3;
          padding: 6px 10px;
          border-radius: 6px;
          background: #ef7430;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 8px 20px rgba(0,0,0,.28);
        }

        .miniBtn {
          min-height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          color: #f3f3f3;
          font-weight: 700;
          padding: 0 14px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .orderFilterBar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 8px 0 16px;
          padding: 10px 14px;
          border-radius: 8px;
          background: rgba(151, 92, 46, 0.11);
          border: 1px solid rgba(255, 166, 102, 0.14);
        }

        .orderFilterBar input,
        .orderFilterBar select {
          min-height: 34px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          background: rgba(255,255,255,0.03);
          color: #fff;
          padding: 0 10px;
          font-size: 12px;
          font-weight: 700;
        }

        .orderFilterBar select {
          color-scheme: dark;
        }

        .orderFilterBar select option {
          background: #171717;
          color: #fff;
        }

        .orderFilterBar input {
          flex: 1 1 220px;
        }

        .orderFilterBar button {
          min-height: 34px;
          border: 0;
          border-radius: 6px;
          background: #ef7430;
          color: #fff;
          padding: 0 14px;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .tableWrap {
          width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          background: rgba(255,255,255,0.01);
        }

        table {
          width: max-content;
          min-width: 100%;
          table-layout: auto;
          border-collapse: collapse;
        }

        th:nth-child(12),
        td:nth-child(12) {
          width: 190px;
          min-width: 190px;
        }

        th:nth-child(13),
        td:nth-child(13) {
          width: 120px;
          min-width: 120px;
        }

        th:nth-child(14),
        td:nth-child(14) {
          width: 130px;
          min-width: 130px;
        }

        th:nth-child(15),
        td:nth-child(15),
        th:nth-child(16),
        td:nth-child(16) {
          width: 150px;
          min-width: 150px;
        }

        th, td {
          padding: 12px 10px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.88);
          font-size: 0.88rem;
          white-space: nowrap;
          overflow: visible;
          text-overflow: clip;
        }

        th {
          background: rgba(255,255,255,0.02);
          color: rgba(255,255,255,0.72);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        tbody tr:hover {
          background: rgba(255,255,255,0.02);
        }

        .narrowCell {
          width: 28px;
          padding-right: 0;
        }

        .rowCheck {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.04);
        }

        .rowCheck.active {
          background: rgba(255, 143, 71, 0.18);
          border-color: rgba(255, 143, 71, 0.38);
        }

        .statusTag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 22px;
          padding: 0 10px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .statusTag.success {
          background: rgba(60, 180, 106, 0.14);
          color: #93e4ae;
        }

        .statusTag.failed {
          background: rgba(255, 98, 98, 0.12);
          color: #ffb2b2;
        }

        .statusTag.pending {
          background: rgba(255,255,255,0.08);
          color: #f0f0f0;
        }

        .emptyCell {
          text-align: center;
          color: rgba(255,255,255,0.68);
          padding: 32px 18px;
        }

        .ordersPagination {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 7px;
          padding-top: 14px;
        }

        .ordersPagination a,
        .ordersPagination span {
          display: inline-flex;
          min-width: 36px;
          min-height: 36px;
          align-items: center;
          justify-content: center;
          padding: 0 11px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 7px;
          color: rgba(255,255,255,.82);
          font-size: 12px;
          font-weight: 800;
        }

        .ordersPagination a:hover,
        .ordersPagination a.isActive {
          border-color: #ef7430;
          background: #ef7430;
          color: #fff;
        }

        .ordersPagination a.isDisabled {
          pointer-events: none;
          opacity: .38;
        }

        @media (max-width: 760px) {
          .ordersHeader {
            flex-direction: column;
            align-items: flex-start;
          }

          .ordersActions {
            justify-content: flex-start;
          }

        }
      `}</style>
    </section>
  );
}
