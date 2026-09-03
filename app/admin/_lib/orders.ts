import { prisma } from "@/lib/db";

export type AdminOrder = Record<string, unknown>;

export type OrdersResult = {
  orders: AdminOrder[];
  totalRecords: number;
  totalPages: number;
  page: number;
  perPage: number;
  error?: string;
};

const defaultPerPage = 20;

function sqlIdentifier(name: string) {
  return `\`${name.replace(/`/g, "``")}\``;
}

async function getOrderColumns() {
  try {
    const rows = (await prisma.$queryRawUnsafe("SHOW COLUMNS FROM `orders`")) as Array<{ Field: string }>;
    return rows.map((row) => row.Field);
  } catch {
    return [];
  }
}

function pickColumn(columns: string[], names: string[]) {
  return names.find((name) => columns.includes(name));
}

function buildWhere(columns: string[], search: string, status: string) {
  const where: string[] = [];
  const params: unknown[] = [];
  const searchColumns = ["order_id", "orderId", "trackId", "buyer_email", "email", "buyer_first_name", "buyer_last_name", "name", "lastName"].filter((column) =>
    columns.includes(column),
  );

  if (search && searchColumns.length > 0) {
    where.push(`(${searchColumns.map((column) => `${sqlIdentifier(column)} LIKE ?`).join(" OR ")})`);
    params.push(...searchColumns.map(() => `%${search}%`));
  }

  const statusColumn = pickColumn(columns, ["payment_status", "status", "statid"]);
  if (status && statusColumn) {
    where.push(`${sqlIdentifier(statusColumn)} = ?`);
    params.push(statusColumn === "statid" && status.toUpperCase() === "SUCCESS" ? "1" : status);
  }

  return {
    clause: where.length > 0 ? `WHERE ${where.join(" AND ")}` : "",
    params,
  };
}

export async function getOrders(search = "", status = "", page = 1, perPage = defaultPerPage): Promise<OrdersResult> {
  const columns = await getOrderColumns();
  const safePage = Math.max(1, page);

  if (columns.length === 0) {
    return {
      orders: [],
      totalRecords: 0,
      totalPages: 1,
      page: safePage,
      perPage,
      error: "The orders table was not found in the configured database.",
    };
  }

  const { clause, params } = buildWhere(columns, search.trim(), status.trim());
  const sortColumn = pickColumn(columns, ["created_at", "createdAt", "id"]) || columns[0];
  const offset = (safePage - 1) * perPage;

  const countRows = (await prisma.$queryRawUnsafe(
    `SELECT COUNT(*) as total FROM \`orders\` ${clause}`,
    ...params,
  )) as Array<{ total: bigint | number }>;
  const totalRecords = Number(countRows[0]?.total || 0);
  const totalPages = Math.max(1, Math.ceil(totalRecords / perPage));

  const orders = (await prisma.$queryRawUnsafe(
    `SELECT * FROM \`orders\` ${clause} ORDER BY ${sqlIdentifier(sortColumn)} DESC LIMIT ${perPage} OFFSET ${offset}`,
    ...params,
  )) as AdminOrder[];

  return {
    orders,
    totalRecords,
    totalPages,
    page: safePage,
    perPage,
  };
}

export async function deleteOrder(id: string) {
  await prisma.$executeRawUnsafe("DELETE FROM `orders` WHERE `id` = ?", id);
}

export async function getBookingDetails(orderId: string) {
  const columns = await getOrderColumns();
  if (!orderId || columns.length === 0) {
    return null;
  }

  const matchColumns = ["orderId", "trackId", "order_id"].filter((column) => columns.includes(column));
  if (matchColumns.length === 0) {
    return null;
  }

  const where = matchColumns.map((column) => `${sqlIdentifier(column)} = ?`).join(" OR ");
  const rows = (await prisma.$queryRawUnsafe(
    `SELECT * FROM \`orders\` WHERE ${where} LIMIT 1`,
    ...matchColumns.map(() => orderId),
  )) as AdminOrder[];
  const booking = rows[0];

  if (!booking) {
    return null;
  }

  return {
    payment_id: booking.transaction_id || booking.payment_id || booking.paymentId || null,
    order_id: booking.orderId || booking.order_id || booking.trackId || null,
    first_name: booking.name || booking.buyer_first_name || booking.first_name || null,
    last_name: booking.lastName || booking.buyer_last_name || booking.last_name || null,
    phone: booking.mobile || booking.phone || null,
    email: booking.email || booking.buyer_email || null,
    address: booking.address || null,
    city: booking.city || null,
    state: booking.state || null,
    country: booking.country || null,
    pincode: booking.pincode || null,
    model: booking.model || null,
    color: booking.color || null,
    product_name: booking.product_name || booking.model || null,
    amount: booking.amount || null,
    status: booking.statid === "1" || booking.statid === 1 ? "Confirmed" : booking.payment_status || booking.status || "Pending",
    created_at: booking.created_at || booking.createdAt || null,
  };
}

export function orderValue(order: AdminOrder, names: string[], fallback = "N/A") {
  for (const name of names) {
    const value = order[name];
    if (value !== null && value !== undefined && value !== "") {
      return String(value);
    }
  }

  return fallback;
}
