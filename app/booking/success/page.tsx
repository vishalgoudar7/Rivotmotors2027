import { BookingResult } from "@/components/BookingFlow/BookingResult";

export default async function BookingSuccessPage({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  const { order_id: orderId = "" } = await searchParams;
  return <BookingResult orderId={orderId} />;
}
