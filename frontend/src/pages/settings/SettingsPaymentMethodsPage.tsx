import React, { useState, useRef, useEffect } from "react";
import { useNewPaymentMethodModal } from "../../context/NewPaymentMethodModalContext";
import { useEditPaymentMethodModal } from "../../context/EditPaymentMethodModalContext";

const PER_PAGE_OPTIONS = [10, 15, 20, 25, 50, 100] as const;

const PAYMENT_METHODS_INITIAL = [
  { id: 1, name: "Bank Account ACH" },
  { id: 2, name: "Cash" },
  { id: 3, name: "Check" },
  { id: 4, name: "Credit" },
  { id: 5, name: "Opening Credit" },
  { id: 6, name: "Stripe" },
];

export const SettingsPaymentMethodsPage = () => {
  const { openModal: openNewPaymentMethodModal, setOnSave: setNewPaymentMethodOnSave } = useNewPaymentMethodModal();
  const { openModal: openEditPaymentMethodModal, setOnSave: setEditPaymentMethodOnSave } = useEditPaymentMethodModal();
  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHODS_INITIAL);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [perPage, setPerPage] = useState(15);
  const [perPageOpen, setPerPageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageRef = useRef<HTMLDivElement>(null);
  const selectedCount = selectedIds.size;
  const recordCount = paymentMethods.length;
  const totalPages = Math.max(1, Math.ceil(recordCount / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const paginatedItems = paymentMethods.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    setNewPaymentMethodOnSave((name: string) => {
      setPaymentMethods((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) + 1 : 1;
        return [...prev, { id: nextId, name }];
      });
    });
    return () => setNewPaymentMethodOnSave(null);
  }, [setNewPaymentMethodOnSave]);

  useEffect(() => {
    setEditPaymentMethodOnSave((id: number, name: string) => {
      setPaymentMethods((prev) => prev.map((m) => (m.id === id ? { ...m, name } : m)));
    });
    return () => setEditPaymentMethodOnSave(null);
  }, [setEditPaymentMethodOnSave]);

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
    <div className="line-items-page payment-methods-page">
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
            <button type="button" className="btn btn-purple" onClick={openNewPaymentMethodModal}>+ Add Payment Method</button>
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
                <th className="col-payment-methods">Payment Methods</th>
              </tr>
            </thead>
            <tbody>
              {pageLoading ? (
                <tr className="line-items-loading-row">
                  <td colSpan={2} className="line-items-loading-cell">
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
                  <td colSpan={2} className="line-items-empty-cell">
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
                    <td
                      className="col-payment-methods link"
                      role="button"
                      tabIndex={0}
                      onClick={() => openEditPaymentMethodModal(row.id, row.name)}
                      onKeyDown={(e) => e.key === "Enter" && openEditPaymentMethodModal(row.id, row.name)}
                    >
                      <span className="table-link-button">{row.name}</span>
                    </td>
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
