import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx-js-style";
import { useNewCustomerModal } from "../context/NewCustomerModalContext";

type SortColumn = "customer" | "email" | "company" | "balance";
type SortDirection = "asc" | "desc";

function parseBalance(value: string): number {
  const cleaned = (value || "").replace(/[$,]/g, "").trim();
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? 0 : n;
}

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="8" fill="#7A83A6" />
    <g>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11ZM7.9998 3.25281C9.68874 3.25281 10.75 3.98978 10.75 5.99999C10.75 7.08162 10.3335 7.57488 9.39526 8.09934L9.36601 8.1157C8.83795 8.41104 8.7498 8.51866 8.7498 8.99999C8.7498 9.41421 8.41402 9.74999 7.9998 9.74999C7.58559 9.74999 7.2498 9.41421 7.2498 8.99999C7.2498 7.86609 7.68129 7.33929 8.6338 6.80655L8.66334 6.79003C9.17748 6.50262 9.25 6.41675 9.25 5.99999C9.25 4.95947 8.95241 4.75281 7.9998 4.75281C7.27298 4.75281 6.75 5.17814 6.75 5.99999C6.75 6.41421 6.41421 6.74999 6 6.74999C5.58579 6.74999 5.25 6.41421 5.25 5.99999C5.25 4.27345 6.50497 3.25281 7.9998 3.25281Z" fill="white" />
    </g>
  </svg>
);

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711L6.41421 12L11.7071 17.2929C12.0976 17.6834 12.0976 18.3166 11.7071 18.7071C11.3166 19.0976 10.6834 19.0976 10.2929 18.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L10.2929 5.29289ZM19 16C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H19ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H10C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11H19ZM19 6C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H15C14.4477 8 14 7.55228 14 7C14 6.44772 14.4477 6 15 6H19Z" fill="var(--color-icon)" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 9.5C10.6193 9.5 9.5 10.6193 9.5 12" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.25 16.25L17.75 17.75" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 7.5L8 11L11.5 7.5" stroke="var(--color-icon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ALPHABET = ["A-Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"];

type SidebarItem = {
  id: string;
  label: string;
  count: number;
  active?: boolean;
  tooltip?: string;
  red?: boolean;
  disabled?: boolean;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "total", label: "Total Customers", count: 1841, active: true, tooltip: "Total customers counts your active and inactive customers. This total does not include leads." },
  { id: "with-service", label: "With a Service", count: 354 },
  { id: "without-service", label: "Without a Service", count: 1487 },
];

const MOCK_CUSTOMERS = [
  { id: 2938, name: "Aaron Rathburn", email: "vwabr337@yahoo.com", company: "", balance: "$0.00" },
  { id: 596, name: "ABDUL AHMED", email: "ahmed0369@gmail.com", company: "", balance: "$0.00" },
  { id: 597, name: "Brian Miller", email: "brian.m@mail.com", company: "Tech Co", balance: "$120.50" },
  { id: 598, name: "Carlos García", email: "carlos.g@mail.com", company: "", balance: "$0.00" },
  { id: 599, name: "Diana Ross", email: "diana.ross@mail.com", company: "Design Studio", balance: "$450.00" },
  { id: 600, name: "Edward Chen", email: "e.chen@mail.com", company: "", balance: "$0.00" },
  { id: 601, name: "Fiona Walsh", email: "fiona.w@mail.com", company: "Walsh & Co", balance: "$89.00" },
  { id: 603, name: "George Thompson", email: "g.thompson@mail.com", company: "", balance: "$0.00" },
  { id: 602, name: "Helen Park", email: "helen.park@mail.com", company: "Park Consulting", balance: "$1,234.00" },
  { id: 604, name: "Ivan Kozlov", email: "ivan.k@mail.com", company: "", balance: "$0.00" },
  { id: 605, name: "Julia Martinez", email: "julia.m@mail.com", company: "Martinez LLC", balance: "$56.75" },
  { id: 606, name: "Kevin O'Brien", email: "kevin.ob@mail.com", company: "", balance: "$0.00" },
  { id: 607, name: "Laura Simmons", email: "laura.s@mail.com", company: "Simmons Inc", balance: "$320.00" },
  { id: 608, name: "Michael Brown", email: "m.brown@mail.com", company: "", balance: "$0.00" },
  { id: 609, name: "Nancy Wilson", email: "nancy.w@mail.com", company: "Wilson Group", balance: "$780.50" },
  { id: 610, name: "Oliver Davis", email: "oliver.d@mail.com", company: "", balance: "$0.00" },
  { id: 3763, name: "Alexis Brown", email: "aw011709@yahoo.com", company: "", balance: "$0.00" },
  { id: 611, name: "Peter Johnson", email: "peter.j@mail.com", company: "Johnson & Sons", balance: "$95.00" },
  { id: 612, name: "Rachel Green", email: "rachel.g@mail.com", company: "", balance: "$0.00" },
  { id: 613, name: "Samuel Lee", email: "samuel.lee@mail.com", company: "Lee Associates", balance: "$2,100.00" },
  { id: 614, name: "Teresa Ruiz", email: "teresa.r@mail.com", company: "", balance: "$0.00" },
  { id: 615, name: "Uma Patel", email: "uma.p@mail.com", company: "Patel Services", balance: "$445.00" },
  { id: 616, name: "Victor Torres", email: "victor.t@mail.com", company: "", balance: "$0.00" },
  { id: 617, name: "William Peña", email: "william.p@mail.com", company: "Peña Dev", balance: "$0.00" },
  { id: 618, name: "Yuki Tanaka", email: "yuki.t@mail.com", company: "Tanaka Corp", balance: "$156.00" },
  { id: 619, name: "Zoe Anderson", email: "zoe.a@mail.com", company: "", balance: "$0.00" },
];

export const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("A-Z");
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [activeSidebarId, setActiveSidebarId] = useState<string>("total");
  const [customersLoading, setCustomersLoading] = useState(false);
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const { openModal: openNewCustomerModal } = useNewCustomerModal();

  useEffect(() => {
    if (!customersLoading) return;
    const t = setTimeout(() => setCustomersLoading(false), 4000);
    return () => clearTimeout(t);
  }, [customersLoading]);

  const sortedCustomers = useMemo(() => {
    if (!sortColumn) return [...MOCK_CUSTOMERS];
    return [...MOCK_CUSTOMERS].sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case "customer":
          cmp = (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: "base" });
          break;
        case "email":
          cmp = (a.email || "").localeCompare(b.email || "", undefined, { sensitivity: "base" });
          break;
        case "company":
          cmp = (a.company || "").localeCompare(b.company || "", undefined, { sensitivity: "base" });
          break;
        case "balance":
          cmp = parseBalance(a.balance) - parseBalance(b.balance);
          break;
      }
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [sortColumn, sortDirection]);

  const handleSort = (column: SortColumn, direction: SortDirection) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const filteredCustomers = useMemo(() => {
    let list = sortedCustomers;
    if (alphabetFilter !== "A-Z") {
      const letter = alphabetFilter.toUpperCase();
      list = list.filter((customer) => {
        const firstChar = (customer.name || "").trim().toUpperCase().charAt(0);
        return firstChar === letter;
      });
    }
    const term = (searchTerm || "").trim().toLowerCase();
    if (!term) return list;
    return list.filter((customer) => {
      const name = (customer.name || "").toLowerCase();
      const email = (customer.email || "").toLowerCase();
      const company = (customer.company || "").toLowerCase();
      return name.includes(term) || email.includes(term) || company.includes(term);
    });
  }, [sortedCustomers, alphabetFilter, searchTerm]);

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSelectedCount(next.size);
      setSelectAll(next.size === MOCK_CUSTOMERS.length);
      return next;
    });
  };

  const selectAllVisible = filteredCustomers.length > 0 && filteredCustomers.every((c) => selectedIds.has(c.id));

  const toggleSelectAll = () => {
    if (selectAllVisible) {
      const filteredIds = new Set(filteredCustomers.map((c) => c.id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.delete(id));
        setSelectedCount(next.size);
        return next;
      });
      setSelectAll(false);
    } else {
      const filteredIds = new Set(filteredCustomers.map((c) => c.id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.add(id));
        setSelectedCount(next.size);
        return next;
      });
      setSelectAll(filteredCustomers.length === MOCK_CUSTOMERS.length);
    }
  };

  const escapeCsvCell = (value: string): string => {
    const s = String(value ?? "").trim();
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const exportToCsv = () => {
    const headers = ["Customer", "Email", "Company", "Balance"];
    const rows = filteredCustomers.map((c) => [
      escapeCsvCell(c.name),
      escapeCsvCell(c.email),
      escapeCsvCell(c.company),
      escapeCsvCell(c.balance),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const headers = ["Customer", "Email", "Company", "Balance"];
    const data = [
      headers,
      ...filteredCustomers.map((c) => [
        (c.name ?? "").trim(),
        (c.email ?? "").trim(),
        (c.company ?? "").trim(),
        (c.balance ?? "").trim(),
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
        const isBalance = c === 3;
        ws[cellRef].s = {
          fill: { fgColor: { rgb: fillRgb }, patternType: "solid" },
          border: thinBorder,
          alignment: {
            vertical: "center",
            horizontal: isBalance ? "right" : "left",
          },
        };
      }
    }

    ws["!cols"] = [
      { wch: 28 },
      { wch: 32 },
      { wch: 22 },
      { wch: 14 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, `customers-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div
      id="wrapper-customer-list"
      className={`container-wrap container-table custom-grid-sidebar container-customer-list${!internalSidebarOpen ? " customer-list-internal-sidebar-hidden" : ""}`}
    >
      {/* Left sidebar - customer list filters */}
      <div id="wrapper-side-menu-customer-list" className="sidebar-menu sidebar-left scrolls" aria-hidden={!internalSidebarOpen}>
        <ul className="sidebar-menu__nav flex-column">
          {SIDEBAR_ITEMS.map((item, index) => {
            return (
              <li key={item.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    className={`sidebar-items flex-betweenitems ${activeSidebarId === item.id ? "active" : ""} ${item.red ? "--red" : ""} ${item.disabled ? "is-disable" : ""}`}
                    onClick={() => {
                      if (item.disabled) return;
                      setActiveSidebarId(item.id);
                      setCustomersLoading(true);
                    }}
                    onKeyDown={(e) => {
                      if (!item.disabled && (e.key === "Enter" || e.key === " ")) {
                        setActiveSidebarId(item.id);
                        setCustomersLoading(true);
                      }
                    }}
                  >
                    <div className="title flex-1">
                      <p className="txt-ellipsis" title={item.label}>
                        {item.label}
                      </p>
                      {item.tooltip && (
                        <div className="tooltip ml-1 d-flex" title={item.tooltip}>
                          <InfoIcon />
                          <span className="tooltiptext">{item.tooltip}</span>
                        </div>
                      )}
                    </div>
                    {!item.disabled && item.count !== undefined && (
                      <p className="count" title={String(item.count)}>
                        {item.count}
                      </p>
                    )}
                  </div>
                </li>
            );
          })}
        </ul>
      </div>

      <div className="wrapper-columns customer-list-main">
        <div className="container-print contents-pages has-tab accessible-tabs-container customer-list gap-8">
          {/* Header: back, search, export, import, new customer */}
          <div className="header customer-list-header">
            <div className="header__left flex-1">
              <button
                type="button"
                className="header-items v2-btn-default --icon-lg"
                aria-label={internalSidebarOpen ? "Ocultar menú" : "Mostrar menú"}
                onClick={() => setInternalSidebarOpen((prev) => !prev)}
                title={internalSidebarOpen ? "Ocultar menú" : "Mostrar menú"}
              >
                <BackIcon />
              </button>
              <div className="search-form relative header-items">
                <span className="svg-search-absolute">
                  <SearchIcon />
                </span>
                <input
                  className="search-ip"
                  type="text"
                  name="term"
                  placeholder="Search"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div id="customer-search-list" className="search-dropdown" style={{ height: "max-content" }}>
                  <div className="scrolls" />
                </div>
              </div>
            </div>
            <div className="export flexcenter flex-wrap gap-4 fw-500 fs-13">
              <div className="export flexcenter gap-4 fw-500 fs-13">
                <p>Export to:</p>
                <div className="flexcenter">
                  <button type="button" className="export__option --blue --left" onClick={exportToCsv}>
                    <span>CSV</span>
                  </button>
                  <button type="button" className="export__option --blue --right" onClick={exportToExcel}>
                    <span>Excel</span>
                  </button>
                </div>
              </div>
              <span className="is-divider mx-1" />
              <div className="header-items v2-btn-default has-icon btn-modal">
                <span className="material-symbols-outlined">publish</span>
                Import
              </div>
              <button
                type="button"
                className="header-items v2-btn-main btn-modal --bg-green"
                onClick={() => openNewCustomerModal()}
              >
                New Customer
              </button>
            </div>
          </div>

          {/* Alphabet filter */}
          <div className="header filter-alphabet">
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                type="button"
                className={`alphabet-item ${alphabetFilter === letter ? "is-active" : ""}`}
                onClick={() => setAlphabetFilter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="wrap-tables flex-column relative">
            {/* Table toolbar */}
            <div className="header --filter action-export align-center gap-8">
              <div className="flexcenter w-100 flex-wrap gap-4">
                <div className="header__left has-filter flex-1">
                  <div className="v2-btn-default btn-mapbox cursor">Map<span className="switch-icon ml-1"><span className="switch-icon__dots" /></span></div>
                  <div className="header-items has-bg-blue v2-dropdown">
                    <div tabIndex={0} className="dropbtn v2-btn-default selection">
                      <div className="dropbtn__label">
                        <span className="txt-ellipsis">Columns</span>
                        <span className="budget">4</span>
                      </div>
                      <span className="arrow"><span className="material-symbols-outlined">keyboard_arrow_down</span></span>
                    </div>
                  </div>
                  <div className="header-items has-bg-blue v2-dropdown">
                    <div tabIndex={0} className="dropbtn v2-btn-default selection">
                      <div className="dropbtn__label">
                        <span className="txt-ellipsis">Status</span>
                        <span className="budget">2</span>
                      </div>
                      <span className="arrow"><span className="material-symbols-outlined">keyboard_arrow_down</span></span>
                    </div>
                  </div>
                  <div className="header-items has-bg-blue v2-dropdown">
                    <div tabIndex={0} className="dropbtn v2-btn-default selection">
                      <div className="dropbtn__label">
                        <span className="txt-ellipsis">Tags</span>
                        <span className="budget --grey">All</span>
                      </div>
                      <span className="arrow"><span className="material-symbols-outlined">keyboard_arrow_down</span></span>
                    </div>
                  </div>
                  <div className="header-items has-bg-blue v2-dropdown">
                    <div tabIndex={0} className="dropbtn v2-btn-default selection">
                      <div className="dropbtn__label">
                        <span className="txt-ellipsis">First name</span>
                      </div>
                      <span className="arrow"><span className="material-symbols-outlined">keyboard_arrow_down</span></span>
                    </div>
                  </div>
                  <div className="v2-btn-default btn-mapbox cursor">Sub Locations<span className="switch-icon ml-1"><span className="switch-icon__dots" /></span></div>
                </div>
                <div className="header-items switch-action v2-dropdown">
                  <div className="dropbtn v2-btn-default --sm --icon-r fs-13" tabIndex={0}>
                    <div className="txt-ellipsis">Active</div>
                    <div className="arrow"><ArrowDownIcon /></div>
                  </div>
                  <div className="v2-dropdown__menu v2-dropdown__menu--customer-list">
                    <ul>
                      <li className="items is-selected">Active</li>
                      <li className="items">Deleted</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex-betweenitems flex-wrap gap-8 w-100">
              <div className={`flexcenter gap-4 flex-wrap ${selectedCount === 0 ? "is-disable" : ""}`}>
                <div className="header-items check-items flexcenter">
                  <input
                    id="customer_list_cb"
                    type="checkbox"
                    checked={selectAllVisible}
                    onChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                  <div className="item-checkbox">
                    <label htmlFor="customer_list_cb"><span /></label>
                  </div>
                  <span className="flexcenter black fw-600">
                    <span className="black-darker2">{selectedCount}</span>
                    <span>/{filteredCustomers.length.toLocaleString()}</span>
                  </span>
                </div>
                <div className="header-items v2-dropdown">
                  <div className="dropbtn items" tabIndex={0}>
                    <div className="txt-ellipsis mr-1">Mark as</div>
                    <div className="arrow"><ArrowDownIcon /></div>
                  </div>
                  <div className="v2-dropdown__menu v2-dropdown__menu--customer-list">
                    <ul>
                      <li className="items">Mark Active</li>
                      <li className="items">Mark Inactive</li>
                      <li className="items">Mark as Lead</li>
                    </ul>
                  </div>
                </div>
                <div className="v2-btn-default has-icon header-items">
                  <span className="material-symbols-outlined">graph_8</span>
                  Merge Accounts
                </div>
                <div className="header-items v2-dropdown">
                  <div className="dropbtn v2-btn-default has-icon" tabIndex={0}>
                    <div className="txt-ellipsis mr-1 black-3">Global Override</div>
                    <div className="arrow"><ArrowDownIcon /></div>
                  </div>
                  <div className="v2-dropdown__menu v2-dropdown__menu--customer-list">
                    <ul>
                      <li className="items has-icon">
                        <span className="material-symbols-outlined">notifications</span>
                        <span>Messaging</span>
                      </li>
                      <li className="items has-icon">
                        <span className="material-symbols-outlined">receipt</span>
                        <span>Hide invoice balance</span>
                      </li>
                      <li className="items has-icon">
                        <span className="material-symbols-outlined">receipt</span>
                        <span>Show invoice balance</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="v2-btn-default has-icon svg-delete-grey header-items">
                  <span className="material-symbols-outlined">delete</span>
                  Delete
                </div>
              </div>
            </div>
            </div>

            {/* Table */}
            <div className="tab-contents has-map">
              <div className="tab-conts" />
              <div className="tab-conts tab-content-active">
                <div className="tables table-multi-column has-checkbox scrolls-x" tabIndex={0}>
                  {/* Table header */}
                  <div className="rows --fixed --header">
                    <div className="col --checkbox">
                      <div className="check-items">
                        <input
                          id="-checkbox-header0-check-box"
                          type="checkbox"
                          checked={selectAllVisible}
                          onChange={toggleSelectAll}
                          aria-label="Select all rows"
                        />
                        <div className="item-checkbox">
                          <label htmlFor="-checkbox-header0-check-box" />
                        </div>
                      </div>
                    </div>
                    <div className="col col-lg">
                      <div className={`has-orderby ${sortColumn === "customer" ? sortDirection : ""}`} title="Customer">
                        <span className="orderby-txt">Customer</span>
                        <span className="sort-arrows">
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-asc material-symbols-outlined ${sortColumn === "customer" && sortDirection === "asc" ? "is-active" : ""}`}
                            onClick={() => handleSort("customer", "asc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("customer", "asc")}
                            title="Ordenar ascendente"
                          >
                            expand_less
                          </span>
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-desc material-symbols-outlined ${sortColumn === "customer" && sortDirection === "desc" ? "is-active" : ""}`}
                            onClick={() => handleSort("customer", "desc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("customer", "desc")}
                            title="Ordenar descendente"
                          >
                            expand_more
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col col-lg">
                      <div className={`has-orderby ${sortColumn === "email" ? sortDirection : ""}`} title="Email">
                        <span className="orderby-txt">Email</span>
                        <span className="sort-arrows">
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-asc material-symbols-outlined ${sortColumn === "email" && sortDirection === "asc" ? "is-active" : ""}`}
                            onClick={() => handleSort("email", "asc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("email", "asc")}
                            title="Ordenar ascendente"
                          >
                            expand_less
                          </span>
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-desc material-symbols-outlined ${sortColumn === "email" && sortDirection === "desc" ? "is-active" : ""}`}
                            onClick={() => handleSort("email", "desc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("email", "desc")}
                            title="Ordenar descendente"
                          >
                            expand_more
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col">
                      <div className={`has-orderby ${sortColumn === "company" ? sortDirection : ""}`} title="Company">
                        <span className="orderby-txt">Company</span>
                        <span className="sort-arrows">
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-asc material-symbols-outlined ${sortColumn === "company" && sortDirection === "asc" ? "is-active" : ""}`}
                            onClick={() => handleSort("company", "asc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("company", "asc")}
                            title="Ordenar ascendente"
                          >
                            expand_less
                          </span>
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-desc material-symbols-outlined ${sortColumn === "company" && sortDirection === "desc" ? "is-active" : ""}`}
                            onClick={() => handleSort("company", "desc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("company", "desc")}
                            title="Ordenar descendente"
                          >
                            expand_more
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col">
                      <div className={`has-orderby ${sortColumn === "balance" ? sortDirection : ""}`} title="Balance">
                        <span className="orderby-txt">Balance</span>
                        <span className="sort-arrows">
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-asc material-symbols-outlined ${sortColumn === "balance" && sortDirection === "asc" ? "is-active" : ""}`}
                            onClick={() => handleSort("balance", "asc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("balance", "asc")}
                            title="Ordenar ascendente"
                          >
                            expand_less
                          </span>
                          <span
                            role="button"
                            tabIndex={0}
                            className={`icon sort-arrow sort-desc material-symbols-outlined ${sortColumn === "balance" && sortDirection === "desc" ? "is-active" : ""}`}
                            onClick={() => handleSort("balance", "desc")}
                            onKeyDown={(e) => e.key === "Enter" && handleSort("balance", "desc")}
                            title="Ordenar descendente"
                          >
                            expand_more
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col col-xs flex-none">
                      <p className="col-label" title="" />
                    </div>
                  </div>

                  {/* Table body */}
                  <div className="tables-list">
                    {customersLoading ? (
                      <div className="rows rows--empty customer-list-loading">
                        <div className="col col--span-all customer-list-loading__inner">
                          <img
                            src="/shared/grass icon.png"
                            alt=""
                            className="customer-list-loading__icon"
                            aria-hidden
                          />
                        </div>
                      </div>
                    ) : filteredCustomers.length === 0 ? (
                      <div className="rows rows--empty">
                        <div className="col col--span-all customer-list-empty-msg">
                          No hay resultados
                        </div>
                      </div>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <div id={String(customer.id)} key={customer.id} className="rows">
                          <div className="col --checkbox">
                            <div className="check-items">
                              <input
                                id={`-${customer.id}-check-box`}
                                type="checkbox"
                                checked={selectedIds.has(customer.id)}
                                onChange={() => toggleRow(customer.id)}
                                aria-label={`Select ${customer.name}`}
                              />
                              <div className="item-checkbox">
                                <label htmlFor={`-${customer.id}-check-box`} />
                              </div>
                            </div>
                          </div>
                          <Link to={`/app/customers/${customer.id}`} className="col col-lg">
                            <p className="name" title={customer.name}>{customer.name}</p>
                          </Link>
                          <div className="col col-lg">
                            <div className="txt-ellipsis" title={customer.email}>{customer.email || ""}</div>
                          </div>
                          <div className="col">
                            <div className="txt-ellipsis" title={customer.company}>{customer.company || ""}</div>
                          </div>
                          <div className={`col ${!customer.balance ? "--empty" : ""}`}>
                            <p className="col-label" title={customer.balance}>{customer.balance}</p>
                          </div>
                          <div className="col col-xs flex-none">
                            <Link
                              to={`/app/customers/account/${customer.id}`}
                              title="Edit"
                              className="v2-btn-default --purple px-1"
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
