/**
 * Helper utility to export array of JSON objects to CSV file download in browser
 */
export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  rows: T[],
  columns: { key: keyof T; header: string }[]
) {
  if (!rows || !rows.length) return;

  const separator = ",";
  const keys = columns.map((col) => col.key);

  const csvContent =
    columns.map((col) => `"${col.header.replace(/"/g, '""')}"`).join(separator) +
    "\n" +
    rows
      .map((row) =>
        keys
          .map((k) => {
            let cell = row[k] === null || row[k] === undefined ? "" : String(row[k]);
            cell = cell.replace(/"/g, '""');
            return `"${cell}"`;
          })
          .join(separator)
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
