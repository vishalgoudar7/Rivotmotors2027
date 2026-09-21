"use client";

export function AutoSubmitStatus({ defaultValue }: { defaultValue: string }) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      onChange={(event) => event.currentTarget.form?.requestSubmit()}
      aria-label="Filter orders by status"
    >
      <option value="">All statuses</option>
      <option value="order_not_completed">Pending</option>
      <option value="payment_completed">Completed</option>
      <option value="payment_failed">Failed</option>
    </select>
  );
}
