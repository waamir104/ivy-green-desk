import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx-js-style";
import { useNewLineItemModal } from "../../context/NewLineItemModalContext";
import { useEditLineItemModal } from "../../context/EditLineItemModalContext";
import { useLineItemsContext } from "./LineItemsContext";

const PER_PAGE_OPTIONS = [10, 15, 20, 25, 50, 100] as const;

const LINE_ITEMS = [
  { id: 1, name: "BALES PINESTRAW FOR FRONTS PLANTS", description: "", tax1: "", tax2: "", cost: "$8.00" },
  { id: 2, name: "Bi-Monthly Service", description: "General maintenance every other month.", tax1: "", tax2: "", cost: "$65.00" },
  { id: 3, name: "Call Back Service", description: "Retreating for areas of concern.", tax1: "", tax2: "", cost: "$0.00" },
  { id: 4, name: "CUBIC YARDS SOIL", description: "TO RISE AREA WHERE PLANTS WILL BE PLANTED", tax1: "", tax2: "", cost: "$0.50" },
  { id: 5, name: "Every 21 Days", description: "Exterior service every 21 days.", tax1: "", tax2: "", cost: "$60.00" },
  { id: 6, name: "Fertilizer Application", description: "Standard lawn fertilizer treatment.", tax1: "", tax2: "", cost: "$45.00" },
  { id: 7, name: "Weed Control", description: "Pre and post-emergent weed treatment.", tax1: "", tax2: "", cost: "$35.00" },
  { id: 8, name: "Mulch Installation", description: "Premium mulch per cubic yard.", tax1: "", tax2: "", cost: "$4.50" },
  { id: 9, name: "Tree Trimming", description: "Professional tree pruning and shaping.", tax1: "", tax2: "", cost: "$125.00" },
  { id: 10, name: "Hedge Maintenance", description: "Hedge trimming and shaping.", tax1: "", tax2: "", cost: "$55.00" },
  { id: 11, name: "Seasonal Cleanup", description: "Leaf removal and debris cleanup.", tax1: "", tax2: "", cost: "$85.00" },
  { id: 12, name: "Aeration Service", description: "Lawn aeration per 1000 sq ft.", tax1: "", tax2: "", cost: "$75.00" },
  { id: 13, name: "Overseeding", description: "Grass seed application.", tax1: "", tax2: "", cost: "$95.00" },
  { id: 14, name: "Irrigation Repair", description: "Sprinkler head and line repair.", tax1: "", tax2: "", cost: "$65.00" },
  { id: 15, name: "Pest Control", description: "Outdoor pest treatment.", tax1: "", tax2: "", cost: "$90.00" },
  { id: 16, name: "Gutter Cleaning", description: "Residential gutter cleaning.", tax1: "", tax2: "", cost: "$150.00" },
  { id: 17, name: "Pressure Washing", description: "Driveway and walkway cleaning.", tax1: "", tax2: "", cost: "$0.15" },
  { id: 18, name: "Landscape Design", description: "Consultation and design fee.", tax1: "", tax2: "", cost: "$200.00" },
  { id: 19, name: "Plant Installation", description: "Per plant installation labor.", tax1: "", tax2: "", cost: "$25.00" },
  { id: 20, name: "Sod Installation", description: "Sod per square foot.", tax1: "", tax2: "", cost: "$0.45" },
  { id: 21, name: "Edging Service", description: "Bed and walkway edging.", tax1: "", tax2: "", cost: "$2.50" },
  { id: 22, name: "Snow Removal", description: "Per visit snow plow.", tax1: "", tax2: "", cost: "$75.00" },
  { id: 23, name: "Emergency Call-Out", description: "After-hours service fee.", tax1: "", tax2: "", cost: "$125.00" },
  { id: 24, name: "Soil Amendment", description: "Compost and soil mix per yard.", tax1: "", tax2: "", cost: "$55.00" },
  { id: 25, name: "Drainage Solution", description: "French drain and grading.", tax1: "", tax2: "", cost: "$0.00" },
];

export const SettingsLineItemsPage = () => {
  const lineItemsCtx = useLineItemsContext();
  const { openModal: openNewLineItemModal } = useNewLineItemModal();
  const { openModal: openEditLineItemModal } = useEditLineItemModal();
  const filterLoading = lineItemsCtx?.loading ?? false;
  const [pageLoading, setPageLoading] = useState(false);
  const loading = filterLoading || pageLoading;
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [perPage, setPerPage] = useState(15);
  const [perPageOpen, setPerPageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageRef = useRef<HTMLDivElement>(null);
  const selectedCount = selectedIds.size;
  const recordCount = LINE_ITEMS.length;
  const totalPages = Math.max(1, Math.ceil(recordCount / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const paginatedItems = LINE_ITEMS.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    if (!perPageOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (perPageRef.current && !perPageRef.current.contains(e.target as Node)) setPerPageOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [perPageOpen]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [perPage, totalPages, currentPage]);

  useEffect(() => {
    if (!pageLoading) return;
    const t = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(t);
  }, [pageLoading]);

  const handlePerPageChange = (n: number) => {
    setPageLoading(true);
    setPerPage(n);
    setPerPageOpen(false);
  };

  const handlePageChange = (page: number) => {
    setPageLoading(true);
    setCurrentPage(page);
  };

  const itemLabel = selectedCount === 1 ? "Item" : "Items";

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = paginatedItems.length > 0 && paginatedItems.every((row) => selectedIds.has(row.id));
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginatedItems.forEach((r) => next.delete(r.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginatedItems.forEach((r) => next.add(r.id));
        return next;
      });
    }
  };

  const escapeCsvCell = (value: string): string => {
    const s = String(value ?? "").trim();
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const exportToCsv = () => {
    const headers = ["Name", "Description", "Tax 1", "Tax 2", "Cost"];
    const rows = LINE_ITEMS.map((row) => [
      escapeCsvCell(row.name),
      escapeCsvCell(row.description),
      escapeCsvCell(row.tax1),
      escapeCsvCell(row.tax2),
      escapeCsvCell(row.cost),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `line-items-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const headers = ["Name", "Description", "Tax 1", "Tax 2", "Cost"];
    const data = [
      headers,
      ...LINE_ITEMS.map((row) => [
        (row.name ?? "").trim(),
        (row.description ?? "").trim(),
        (row.tax1 ?? "").trim(),
        (row.tax2 ?? "").trim(),
        (row.cost ?? "").trim(),
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);

    const thinBorder = {
      top: { style: "thin", color: { rgb: "FF000000" } },
      bottom: { style: "thin", color: { rgb: "FF000000" } },
      left: { style: "thin", color: { rgb: "FF000000" } },
      right: { style: "thin", color: { rgb: "FF000000" } },
    };

    const headerStyle = {
      fill: { fgColor: { rgb: "FF404040" }, patternType: "solid" },
      font: { bold: true, color: { rgb: "FFFFFFFF" }, sz: 11 },
      border: thinBorder,
      alignment: { vertical: "center", horizontal: "left" },
    };

    const rowCount = data.length;
    const colCount = headers.length;

    for (let c = 0; c < colCount; c++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c });
      if (!ws[cellRef]) continue;
      ws[cellRef].s = headerStyle;
    }

    for (let r = 1; r < rowCount; r++) {
      const isAlternate = (r - 1) % 2 === 1;
      const fillRgb = isAlternate ? "FFF2F2F2" : "FFFFFFFF";
      for (let c = 0; c < colCount; c++) {
        const cellRef = XLSX.utils.encode_cell({ r, c });
        if (!ws[cellRef]) continue;
        const isCost = c === 4;
        ws[cellRef].s = {
          fill: { fgColor: { rgb: fillRgb }, patternType: "solid" },
          border: thinBorder,
          alignment: {
            vertical: "center",
            horizontal: isCost ? "right" : "left",
          },
        };
      }
    }

    ws["!cols"] = [
      { wch: 32 },
      { wch: 40 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Line Items");
    XLSX.writeFile(wb, `line-items-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="line-items-page">
      <div className="table-container">
            <div className="table-actions">
              <div className="left-actions">
                <span className="item-count">{selectedCount} {itemLabel}</span>
                <button
                  type="button"
                  className={`btn btn-dark ${selectedCount === 0 ? "is-disable" : ""}`}
                  disabled={selectedCount === 0}
                >
                  <span className="material-symbols-outlined">delete</span>
                  Delete
                </button>
                <button
                  type="button"
                  className={`btn btn-dark ${selectedCount === 0 ? "is-disable" : ""}`}
                  disabled={selectedCount === 0}
                >
                  <span className="material-symbols-outlined">schedule</span>
                  Archive
                </button>
              </div>

              <div className="right-actions">
                <span className="export-text">Export {recordCount} records:</span>
                <div className="export-options-group">
                  <button type="button" className="export__option --blue --left" onClick={exportToCsv}>CSV</button>
                  <button type="button" className="export__option --blue --right" onClick={exportToExcel}>Excel</button>
                </div>
                <button type="button" className="btn btn-dark">
                  <span className="material-symbols-outlined">print</span>
                  Print
                </button>
                <button type="button" className="btn btn-dark">Line Item Global Override</button>
                <button type="button" className="btn btn-purple" onClick={openNewLineItemModal}>+ Add Item</button>
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Tax 1</th>
                    <th>Tax 2</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="line-items-loading-row">
                      <td colSpan={6} className="line-items-loading-cell">
                        <div className="line-items-loading__inner">
                          <img
                            src="/shared/grass icon.png"
                            alt=""
                            className="line-items-loading__icon"
                            aria-hidden
                          />
                        </div>
                      </td>
                    </tr>
                  ) : recordCount === 0 ? (
                    <tr className="line-items-empty-row">
                      <td colSpan={6} className="line-items-empty-cell">
                        <div className="line-items-empty-msg">There is no data to display.</div>
                      </td>
                    </tr>
                  ) : (
                    paginatedItems.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedIds.has(row.id)}
                            onChange={() => toggleRow(row.id)}
                            aria-label={`Select ${row.name}`}
                          />
                        </td>
                        <td className="link">
                          <button
                            type="button"
                            className="table-link-button"
                            onClick={() => openEditLineItemModal(row)}
                          >
                            {row.name}
                          </button>
                        </td>
                        <td>{row.description}</td>
                        <td>{row.tax1}</td>
                        <td>{row.tax2}</td>
                        <td>{row.cost}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="per-page">
                <div ref={perPageRef} className={`custom-select${perPageOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="custom-select__trigger"
                    aria-label="Per page"
                    aria-expanded={perPageOpen}
                    aria-haspopup="listbox"
                    onClick={() => setPerPageOpen((o) => !o)}
                  >
                    <span className="custom-select__value">{perPage} Per Page</span>
                    <span className="custom-select__arrow" aria-hidden />
                  </button>
                  <div
                    className="custom-select__menu"
                    role="listbox"
                    aria-label="Per page options"
                  >
                    {PER_PAGE_OPTIONS.map((n) => (
                      <div
                        key={n}
                        role="option"
                        aria-selected={perPage === n}
                        className={`custom-select__option${perPage === n ? " is-selected" : ""}`}
                        onClick={() => handlePerPageChange(n)}
                      >
                        {n} Per Page
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pagination">
                <button
                  type="button"
                  className="page-btn"
                  aria-label="First page"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                >
                  «
                </button>
                <button
                  type="button"
                  className="page-btn"
                  aria-label="Previous"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`page-btn${currentPage === page ? " active" : ""}`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className="page-btn"
                  aria-label="Next"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                >
                  ›
                </button>
                <button
                  type="button"
                  className="page-btn"
                  aria-label="Last page"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                >
                  »
                </button>
              </div>
            </div>
      </div>
    </div>
  );
};
