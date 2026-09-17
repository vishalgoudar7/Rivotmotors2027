"use client";

import { useState } from "react";

export type OrderExportRow = {
  id: number;
  price: string;
  model: string;
  color: string;
  productName: string;
  trackId: string;
  orderId: string;
  description: string;
  transactionId: string;
  status: string;
  customer: string;
  date: string;
  mobile: string;
  city: string;
  state: string;
};

const columns: Array<{ key: keyof OrderExportRow; label: string }> = [
  { key: "id", label: "ID" },
  { key: "price", label: "Price" },
  { key: "model", label: "Model" },
  { key: "color", label: "Color" },
  { key: "productName", label: "Product Name" },
  { key: "trackId", label: "Track ID" },
  { key: "orderId", label: "Order ID" },
  { key: "description", label: "Product Description" },
  { key: "transactionId", label: "Transaction ID" },
  { key: "status", label: "Status" },
  { key: "customer", label: "Customer" },
  { key: "date", label: "Date" },
  { key: "mobile", label: "Mobile Number" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
];

function cellValue(row: OrderExportRow, key: keyof OrderExportRow) {
  return String(row[key] ?? "");
}

function downloadFile(content: BlobPart, type: string, extension: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `rivot-orders-${new Date().toISOString().slice(0, 10)}.${extension}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

function printableTable(rows: OrderExportRow[]) {
  const head = columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const body = rows.map((row) => `<tr>${columns.map((column) => `<td>${escapeHtml(cellValue(row, column.key))}</td>`).join("")}</tr>`).join("");
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function openPrintView(rows: OrderExportRow[]) {
  const popup = window.open("", "_blank");
  if (!popup) return false;
  popup.opener = null;
  popup.document.write(`<!doctype html><html><head><title>RIVOT Orders</title><style>@page{size:landscape;margin:10mm}body{font-family:Arial,sans-serif;color:#111}h1{font-size:20px}table{width:100%;border-collapse:collapse;font-size:8px}th,td{padding:5px;border:1px solid #bbb;text-align:left}th{background:#eee}</style></head><body><h1>RIVOT Orders</h1>${printableTable(rows)}</body></html>`);
  popup.document.close();
  popup.focus();
  window.setTimeout(() => popup.print(), 250);
  return true;
}

function pdfEscape(value: string) {
  return value.replace(/₹/g, "Rs ").replace(/[^\x20-\x7E]/g, " ").replace(/([\\()])/g, "\\$1");
}

function createPdf(rows: OrderExportRow[]) {
  const pageWidth = 1191;
  const pageHeight = 842;
  const tableX = 20;
  const tableTop = 786;
  const headerHeight = 25;
  const rowHeight = 20;
  const rowsPerPage = 35;
  const columnWidths = [25, 50, 50, 45, 80, 95, 95, 110, 95, 85, 105, 70, 80, 60, 65];
  const pages: OrderExportRow[][] = [];
  for (let index = 0; index < rows.length; index += rowsPerPage) pages.push(rows.slice(index, index + rowsPerPage));
  if (pages.length === 0) pages.push([]);

  function text(value: string, x: number, y: number, size = 6.5, bold = false) {
    return `BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${y} Td (${pdfEscape(value)}) Tj ET`;
  }

  function fitted(value: string, width: number) {
    const clean = value.replace(/₹/g, "Rs ").replace(/[^\x20-\x7E]/g, " ");
    const maxCharacters = Math.max(3, Math.floor((width - 7) / 3.45));
    return clean.length > maxCharacters ? `${clean.slice(0, maxCharacters - 3)}...` : clean;
  }

  const objects: string[] = [];
  const pageRefs = pages.map((_, index) => `${4 + index * 2} 0 R`).join(" ");
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageRefs}] /Count ${pages.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  const boldFontId = 4 + pages.length * 2;
  objects[boldFontId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  pages.forEach((pageRows, index) => {
    const pageId = 4 + index * 2;
    const contentId = pageId + 1;
    const commands: string[] = [
      text("RIVOT Orders", tableX, 816, 16, true),
      text(`Generated ${new Date().toLocaleDateString("en-IN")}  |  ${rows.length} orders`, tableX + 145, 818, 8),
      "0.94 g",
      `${tableX} ${tableTop - headerHeight} ${columnWidths.reduce((sum, width) => sum + width, 0)} ${headerHeight} re f`,
      "0 g",
      "0.45 G 0.55 w",
    ];

    const tableBottom = tableTop - headerHeight - pageRows.length * rowHeight;
    const tableWidth = columnWidths.reduce((sum, width) => sum + width, 0);
    commands.push(`${tableX} ${tableBottom} ${tableWidth} ${tableTop - tableBottom} re S`);

    let x = tableX;
    columns.forEach((column, columnIndex) => {
      commands.push(text(fitted(column.label, columnWidths[columnIndex]), x + 3, tableTop - 16, 6.2, true));
      x += columnWidths[columnIndex];
      if (columnIndex < columns.length - 1) commands.push(`${x} ${tableBottom} m ${x} ${tableTop} l S`);
    });
    commands.push(`${tableX} ${tableTop - headerHeight} m ${tableX + tableWidth} ${tableTop - headerHeight} l S`);

    pageRows.forEach((row, rowIndex) => {
      const rowTop = tableTop - headerHeight - rowIndex * rowHeight;
      const baseline = rowTop - 13;
      let cellX = tableX;
      columns.forEach((column, columnIndex) => {
        commands.push(text(fitted(cellValue(row, column.key), columnWidths[columnIndex]), cellX + 3, baseline));
        cellX += columnWidths[columnIndex];
      });
      commands.push(`${tableX} ${rowTop - rowHeight} m ${tableX + tableWidth} ${rowTop - rowHeight} l S`);
    });

    commands.push(text(`Page ${index + 1} of ${pages.length}`, pageWidth - 90, 20, 7));
    const content = commands.join("\n");
    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let id = 1; id < objects.length; id += 1) pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

export function OrdersActions({ rows }: { rows: OrderExportRow[] }) {
  const [message, setMessage] = useState("");

  function showMessage(value: string) {
    setMessage(value);
    window.setTimeout(() => setMessage(""), 2200);
  }

  async function copyOrders() {
    const text = [columns.map((column) => column.label).join("\t"), ...rows.map((row) => columns.map((column) => cellValue(row, column.key)).join("\t"))].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showMessage("Orders copied");
  }

  function exportCsv() {
    const csv = [columns.map((column) => csvValue(column.label)).join(","), ...rows.map((row) => columns.map((column) => csvValue(cellValue(row, column.key))).join(","))].join("\r\n");
    downloadFile(`\uFEFF${csv}`, "text/csv;charset=utf-8", "csv");
    showMessage("CSV downloaded");
  }

  function exportExcel() {
    const workbook = `<html><head><meta charset="utf-8"></head><body>${printableTable(rows)}</body></html>`;
    downloadFile(workbook, "application/vnd.ms-excel;charset=utf-8", "xls");
    showMessage("Excel file downloaded");
  }

  function exportPdf() {
    downloadFile(createPdf(rows), "application/pdf", "pdf");
    showMessage("PDF downloaded");
  }

  return (
    <div className="ordersActions" aria-live="polite">
      <button type="button" className="miniBtn" onClick={() => void copyOrders()}>Copy</button>
      <button type="button" className="miniBtn" onClick={exportCsv}>CSV</button>
      <button type="button" className="miniBtn" onClick={exportExcel}>Excel</button>
      <button type="button" className="miniBtn" onClick={exportPdf}>PDF</button>
      <button type="button" className="miniBtn" onClick={() => { if (!openPrintView(rows)) showMessage("Allow pop-ups to print"); }}>Print</button>
      {message ? <span className="ordersActionMessage">{message}</span> : null}
    </div>
  );
}
