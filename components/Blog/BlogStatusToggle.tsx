"use client";

import { useState } from "react";

type BlogStatus = "draft" | "published";

export function BlogStatusToggle({ id, status, onUpdated }: { id:number; status:BlogStatus; onUpdated:(status:BlogStatus)=>void }) {
  const [busy, setBusy] = useState(false);
  const nextStatus: BlogStatus = status === "published" ? "draft" : "published";

  async function toggle() {
    setBusy(true);
    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.error || "Unable to update blog status.");
      onUpdated(nextStatus);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to update blog status.");
    } finally {
      setBusy(false);
    }
  }

  return <button className={`blogStatusToggle ${status}`} type="button" onClick={toggle} disabled={busy} title={`Change status to ${nextStatus}`}>
    {busy ? "Updating..." : status === "published" ? "Published" : "Draft"}
  </button>;
}
