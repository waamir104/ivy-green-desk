import React, { useState, useRef, useEffect } from "react";
import { useNewScheduleModal } from "../../context/NewScheduleModalContext";

const PER_PAGE_OPTIONS = [10, 15, 20, 25, 50, 100] as const;

interface ScheduleRow {
  id: number;
  name: string;
  color: string;
  nickname: string;
  assignTo: string;
  jobsActive: number;
  startAddress: string;
  endAddress: string;
}

const SCHEDULES: ScheduleRow[] = [
  { id: 1, name: "Schedule 1", color: "#045AF9", nickname: "Crew A", assignTo: "John Smith", jobsActive: 24, startAddress: "123 Main St", endAddress: "456 Oak Ave" },
  { id: 2, name: "Schedule 2", color: "#85B501", nickname: "Crew B", assignTo: "Jane Doe", jobsActive: 18, startAddress: "789 Pine Rd", endAddress: "321 Elm St" },
  { id: 3, name: "Schedule 3", color: "#FA6601", nickname: "Crew C", assignTo: "Bob Wilson", jobsActive: 31, startAddress: "555 Cedar Ln", endAddress: "777 Maple Dr" },
  { id: 4, name: "Schedule 4", color: "#7651A8", nickname: "Crew D", assignTo: "Alice Brown", jobsActive: 12, startAddress: "100 First Ave", endAddress: "200 Second Blvd" },
  { id: 5, name: "Schedule 5", color: "#9DA5B3", nickname: "Crew E", assignTo: "Charlie Davis", jobsActive: 22, startAddress: "300 Third St", endAddress: "400 Fourth Rd" },
];

export const SettingsSchedulesPage = () => {
  const { openModal: openNewScheduleModal } = useNewScheduleModal();
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [perPage, setPerPage] = useState(15);
  const [perPageOpen, setPerPageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageRef = useRef<HTMLDivElement>(null);
  const selectedCount = selectedIds.size;
  const recordCount = SCHEDULES.length;
  const totalPages = Math.max(1, Math.ceil(recordCount / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const paginatedItems = SCHEDULES.slice(startIndex, startIndex + perPage);

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

  return (
    <div className="line-items-page schedules-page">
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
              <button type="button" className="export__option --blue --left">CSV</button>
              <button type="button" className="export__option --blue --right">Excel</button>
            </div>
            <button type="button" className="btn btn-dark">
              <span className="material-symbols-outlined">print</span>
              Print
            </button>
            <button type="button" className="btn btn-purple" onClick={openNewScheduleModal}>+ Add Schedule</button>
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
                <th>color</th>
                <th>Nickname</th>
                <th>Assign To</th>
                <th>Jobs Active</th>
                <th>Start/End Address</th>
              </tr>
            </thead>
            <tbody>
              {pageLoading ? (
                <tr className="line-items-loading-row">
                  <td colSpan={7} className="line-items-loading-cell">
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
                  <td colSpan={7} className="line-items-empty-cell">
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
                      <span className="table-link-button">{row.name}</span>
                    </td>
                    <td>
                      <span
                        className="schedule-color-dot"
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: row.color,
                        }}
                        title={row.color}
                      />
                    </td>
                    <td>{row.nickname}</td>
                    <td>{row.assignTo}</td>
                    <td>{row.jobsActive}</td>
                    <td>{row.startAddress} / {row.endAddress}</td>
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
