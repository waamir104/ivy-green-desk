import { createPortal } from "react-dom";
import { useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";

const menuItemClass = (isActive: boolean) =>
  `tooltip menu-item${isActive ? " is-active" : ""}`;

function isCalendarActive(pathname: string) {
  return pathname === "/app/calendar" || pathname.startsWith("/app/calendar/");
}
function isCustomersActive(pathname: string) {
  return (
    pathname === "/app" ||
    pathname === "/app/customers" ||
    pathname.startsWith("/app/customers/")
  );
}
function isSettingsActive(pathname: string) {
  return pathname.includes("settings");
}

const TOOLTIP_OFFSET = 12;

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [tooltip, setTooltip] = useState<{ label: string; top: number; left: number } | null>(null);

  const showTooltip = useCallback((label: string, el: HTMLElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTooltip({
      label,
      top: rect.top + rect.height / 2,
      left: rect.right + TOOLTIP_OFFSET,
    });
  }, []);

  const hideTooltip = useCallback(() => setTooltip(null), []);

  const tooltipPortal =
    tooltip &&
    createPortal(
      <span
        className="sidebar-tooltip-portal"
        style={{
          position: "fixed",
          top: tooltip.top,
          left: tooltip.left,
          transform: "translateY(-50%)",
          margin: 0,
        }}
      >
        {tooltip.label}
      </span>,
      document.body
    );

  return (
    <div id="sidebar" className="sidebar-container active">
      {tooltipPortal}
      <div className="sidebar-container__content flex-column">
        <NavLink
          to="/app/calendar"
          className={() => menuItemClass(isCalendarActive(pathname))}
          aria-current={isCalendarActive(pathname) ? "page" : undefined}
          onMouseEnter={(e) => showTooltip("Calendar", e.currentTarget)}
          onMouseLeave={hideTooltip}
        >
          <span className="menu-item__icon">
            <span className="material-symbols-outlined">event</span>
          </span>
          <span className="tooltiptext right" aria-hidden="true">Calendar</span>
        </NavLink>
        <NavLink
          to="/app/customers"
          className={() => menuItemClass(isCustomersActive(pathname))}
          aria-current={isCustomersActive(pathname) ? "page" : undefined}
          onMouseEnter={(e) => showTooltip("Customers", e.currentTarget)}
          onMouseLeave={hideTooltip}
        >
          <span className="menu-item__icon">
            <span className="material-symbols-outlined">account_circle</span>
          </span>
          <span className="tooltiptext right" aria-hidden="true">Customers</span>
        </NavLink>
      </div>
      <div className="sidebar-container__content flex-column">
        <NavLink
          to="/app/settings/company"
          className={() => menuItemClass(isSettingsActive(pathname))}
          aria-current={isSettingsActive(pathname) ? "page" : undefined}
          onMouseEnter={(e) => showTooltip("Settings", e.currentTarget)}
          onMouseLeave={hideTooltip}
        >
          <span className="menu-item__icon">
            <span className="material-symbols-outlined">settings</span>
          </span>
          <span className="tooltiptext right" aria-hidden="true">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};
