import { NextResponse } from "next/server";
import { getBookingDetails } from "../_lib/orders";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order_id") || "";

  if (!orderId) {
    return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
  }

  const booking = await getBookingDetails(orderId);
  if (!booking) {
    return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, booking });
}
