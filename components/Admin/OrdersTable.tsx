import Link from "next/link";
import { orderValue, type AdminOrder, type OrdersResult } from "@/app/admin/_lib/orders";

function formatAmount(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount) ? `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : value;
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
  search,
  status,
}: {
  result: OrdersResult;
  search: string;
  status: string;
}) {
  const rows = result.orders.map((order, index) => {
    const orderId = getOrderId(order) || `#${index + 1}`;
    const model = orderValue(order, ["model", "model_name", "product_name", "productName", "product"], "nx100");
    const productName = orderValue(order, ["product_name", "productName", "product", "model"], "nx100-Gray-Pro");
    const amount = formatAmount(orderValue(order, ["amount"], "0"));
    const customer = `${orderValue(order, ["buyer_first_name", "name", "first_name"], "")} ${orderValue(order, ["buyer_last_name", "lastName", "last_name"], "")}`.trim() || "N/A";
    const statusValue = getStatus(order);

    return {
      id: index + 1,
      orderId,
      price: amount,
      model,
      color: index % 2 === 0 ? "Gray" : "Black",
      productName,
      trackId: orderValue(order, ["track_id", "tracking_id", "trackId"], `NX100-PRO-${index + 1}`),
      description: productName,
      transactionId: orderValue(order, ["transaction_id", "payment_id", "txn_id"], `ZP${String(index + 1).padStart(2, "0")}...`),
      customer,
      status: statusValue,
    };
  });

  return (
    <section className="ordersSection" id="orders">
      <div className="ordersHeader">
        <div className="ordersTitleWrap">
          <span className="ordersIcon">👥</span>
          <h2>Orders</h2>
        </div>

        <div className="ordersActions">
          <button type="button" className="miniBtn">Copy</button>
          <button type="button" className="miniBtn">CSV</button>
          <button type="button" className="miniBtn">Excel</button>
          <button type="button" className="miniBtn">PDF</button>
          <button type="button" className="miniBtn">Print</button>
          <Link href="/book-now" className="addBtn">+ Add New</Link>
        </div>
      </div>

      <form className="orderFilterBar">
        <div className="entriesBlock">
          <span>Show</span>
          <select defaultValue="25">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>
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
                  <td>
                    <span className={`statusTag ${statusClass(row.status)}`}>{row.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="emptyCell">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
        }

        .miniBtn,
        .addBtn {
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

        .addBtn {
          background: linear-gradient(180deg, #f29a5b, #ea7d38);
          border-color: rgba(255, 166, 102, 0.9);
          color: #fff;
        }

        .orderFilterBar {
          margin: 8px 0 16px;
          padding: 10px 14px;
          border-radius: 8px;
          background: rgba(151, 92, 46, 0.11);
          border: 1px solid rgba(255, 166, 102, 0.14);
        }

        .entriesBlock {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #f1e2d2;
          font-weight: 700;
        }

        .entriesBlock select {
          min-height: 30px;
          min-width: 68px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          color: #fff;
          padding: 0 8px;
        }

        .tableWrap {
          width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          background: rgba(255,255,255,0.01);
        }

        table {
          width: 100%;
          min-width: 1180px;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px 10px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.88);
          font-size: 0.88rem;
          white-space: nowrap;
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
