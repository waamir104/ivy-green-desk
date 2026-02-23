import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSettingsItemByPath, SETTINGS_BASE, SETTINGS_GROUPS } from "./settingsConfig";
import { useLineItemsContext } from "./LineItemsContext";

/* Same as Header: default = hamburger, active = back arrow + menu lines */
const SidebarIconDefault = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M15 16C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H5C4.44772 18 4 17.5523 4 17C4 16.4477 4.44772 16 5 16H15ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H19ZM19 6C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H19Z" fill="var(--color-icon)" />
  </svg>
);
/* Same as Header div.active: back arrow + menu lines when menu is visible */
const SidebarIconActive = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711L6.41421 12L11.7071 17.2929C12.0976 17.6834 12.0976 18.3166 11.7071 18.7071C11.3166 19.0976 10.6834 19.0976 10.2929 18.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L10.2929 5.29289ZM19 16C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H19ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H10C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11H19ZM19 6C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H15C14.4477 8 14 7.55228 14 7C14 6.44772 14.4477 6 15 6H19Z" fill="var(--color-icon)" />
  </svg>
);

type SettingsHeaderProps = {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
};

export const SettingsHeader = ({ sidebarOpen = true, onToggleSidebar }: SettingsHeaderProps) => {
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentItem = getSettingsItemByPath(pathname);
  const currentLabel = currentItem?.label ?? "Company";
  const isLineItemsPage = pathname === `${SETTINGS_BASE}/items` || pathname.startsWith(`${SETTINGS_BASE}/items/`);
  const lineItemsCtx = useLineItemsContext();
  const lineItemsFilter = lineItemsCtx?.filter ?? "archived";
  const setLineItemsFilter = lineItemsCtx?.setFilter ?? (() => {});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header --main settings-page-bg">
      <div className="header__left flex-1">
        {onToggleSidebar ? (
          <button
            type="button"
            className={`header-items btn-bg-grey v2-btn-default --icon-lg --transparent items-collapse${sidebarOpen ? " active" : ""}`}
            aria-label={sidebarOpen ? "Ocultar menú" : "Mostrar menú"}
            title={sidebarOpen ? "Ocultar menú" : "Mostrar menú"}
            onClick={onToggleSidebar}
          >
            <div className="default">
              <SidebarIconDefault />
            </div>
            <div className="active">
              <SidebarIconActive />
            </div>
          </button>
        ) : (
          <Link
            to="/app"
            className="header-items btn-bg-grey v2-btn-default --icon-lg --transparent"
            aria-label="Back"
          >
            <div className="default">
              <SidebarIconDefault />
            </div>
          </Link>
        )}
        <div
          ref={dropdownRef}
          className={`header-items v2-dropdown list-menu${dropdownOpen ? " is-open" : ""}`}
        >
          <button
            type="button"
            className="dropbtn items v2-btn-default has-bg-grey"
            onClick={() => setDropdownOpen((o) => !o)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <h2 className="txt-ellipsis fs-14">{currentLabel}</h2>
            <div className="arrow">
              <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </div>
          </button>
          <div className="v2-dropdown__menu scrolls" id="dropdown-report-menu">
            <div className="d-flex">
              <div className="col-half">
                <div className="subtitle" title="SYSTEM SETTINGS">
                  SYSTEM SETTINGS
                </div>
                {SETTINGS_GROUPS[1].items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`items has-icon${pathname === item.path ? " active" : ""}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <p className="txt-ellipsis items-text" title={item.label}>
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="col-half">
                <div className="subtitle" title="Email & Sms Templates">
                  Email & Sms Templates
                </div>
                {SETTINGS_GROUPS[2].items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`items has-icon${pathname === item.path ? " active" : ""}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <p className="txt-ellipsis items-text" title={item.label}>
                      {item.label}
                    </p>
                  </Link>
                ))}
                <div className="line" />
                <div className="subtitle" title="Your Account">
                  Your Account
                </div>
                {SETTINGS_GROUPS[0].items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`items has-icon${pathname === item.path ? " active" : ""}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <p className="txt-ellipsis items-text" title={item.label}>
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isLineItemsPage && lineItemsCtx && (
          <div className="segmented-control header-items">
            <button
              type="button"
              className={`tab${lineItemsFilter === "active" ? " active" : ""}`}
              onClick={() => setLineItemsFilter("active")}
            >
              Active
            </button>
            <button
              type="button"
              className={`tab${lineItemsFilter === "archived" ? " active" : ""}`}
              onClick={() => setLineItemsFilter("archived")}
            >
              Archived
            </button>
            <button
              type="button"
              className={`tab${lineItemsFilter === "deleted" ? " active" : ""}`}
              onClick={() => setLineItemsFilter("deleted")}
            >
              Deleted
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
