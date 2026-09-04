import { BookingResult } from "@/components/BookingFlow/BookingResult";

export default async function PaymentFailedPage({ searchParams }: { searchParams: Promise<{ order_id?: string; reason?: string }> }) {
  const { order_id: orderId = "", reason = "" } = await searchParams;
  return <BookingResult orderId={orderId} failed reason={reason} />;
}
