import React, { useState } from "react";

const LINE_ITEMS = [
  { id: 1, name: "BALES PINESTRAW FOR FRONTS PLANTS", description: "", tax1: "", tax2: "", cost: "$8.00" },
  { id: 2, name: "Bi-Monthly Service", description: "General maintenance every other month.", tax1: "", tax2: "", cost: "$65.00" },
  { id: 3, name: "Call Back Service", description: "Retreating for areas of concern.", tax1: "", tax2: "", cost: "$0.00" },
  { id: 4, name: "CUBIC YARDS SOIL", description: "TO RISE AREA WHERE PLANTS WILL BE PLANTED", tax1: "", tax2: "", cost: "$0.50" },
  { id: 5, name: "Every 21 Days", description: "Exterior service every 21 days.", tax1: "", tax2: "", cost: "$60.00" },
];

export const SettingsLineItemsPage = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const selectedCount = selectedIds.size;
  const recordCount = LINE_ITEMS.length;
  const itemLabel = selectedCount === 1 ? "Item" : "Items";

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = LINE_ITEMS.length > 0 && LINE_ITEMS.every((row) => selectedIds.has(row.id));
  const toggleSelectAll = () => {
    if (selectAll) setSelectedIds(new Set());
    else setSelectedIds(new Set(LINE_ITEMS.map((r) => r.id)));
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
                  <button type="button" className="export__option --blue --left">CSV</button>
                  <button type="button" className="export__option --blue --right">Excel</button>
                </div>
                <button type="button" className="btn btn-dark">
                  <span className="material-symbols-outlined">print</span>
                  Print
                </button>
                <button type="button" className="btn btn-dark">Line Item Global Override</button>
                <button type="button" className="btn btn-purple">+ Add Item</button>
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
                  {LINE_ITEMS.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(row.id)}
                          onChange={() => toggleRow(row.id)}
                          aria-label={`Select ${row.name}`}
                        />
                      </td>
                      <td className="link">{row.name}</td>
                      <td>{row.description}</td>
                      <td>{row.tax1}</td>
                      <td>{row.tax2}</td>
                      <td>{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="per-page">
                <select aria-label="Per page">
                  <option>15 Per Page</option>
                </select>
              </div>

              <div className="pagination">
                <button type="button" className="page-btn" aria-label="First page">«</button>
                <button type="button" className="page-btn" aria-label="Previous">‹</button>
                <button type="button" className="page-btn active">1</button>
                <button type="button" className="page-btn">2</button>
                <button type="button" className="page-btn" aria-label="Next">›</button>
                <button type="button" className="page-btn" aria-label="Last page">»</button>
              </div>
            </div>
      </div>
    </div>
  );
};
