import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconArrowDown,
  IconSearch,
  IconPlus,
} from "./HeaderIcons";
import { useNewCustomerModal } from "../../context/NewCustomerModalContext";

interface HeaderProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const navOptions = [
  { path: "/app", label: "Calendar", icon: "event" },
  { path: "/app/customers", label: "Customers", icon: "account_circle" },
  { path: "/app/settings/company", label: "Settings", icon: "settings" },
] as const;

function getSelectedOption(pathname: string) {
  if (pathname.includes("customer")) return navOptions[1];
  if (pathname.includes("settings")) return navOptions[2];
  return navOptions[0];
}

type Theme = "light" | "dark" | "system";

function useEffectiveDark(theme: Theme) {
  const [prefersDark, setPrefersDark] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    if (theme !== "system") return;
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const fn = () => setPrefersDark(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [theme]);
  return theme === "dark" || (theme === "system" && prefersDark);
}

const HEADER_TOOLTIP_OFFSET = 8;

export const Header = ({ isSidebarOpen = true, onToggleSidebar }: HeaderProps) => {
  const { pathname } = useLocation();
  const { openModal } = useNewCustomerModal();
  const selectedOption = getSelectedOption(pathname);
  const [isCalendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [isModeMenuOpen, setModeMenuOpen] = useState(false);
  const [headerTooltip, setHeaderTooltip] = useState<{ label: string; top: number; left: number } | null>(null);
  const effectiveDark = useEffectiveDark(theme);
  const calendarDropdownRef = useRef<HTMLDivElement>(null);
  const modeDropdownRef = useRef<HTMLDivElement>(null);

  const showHeaderTooltip = useCallback((label: string, el: HTMLElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setHeaderTooltip({
      label,
      top: rect.bottom + HEADER_TOOLTIP_OFFSET,
      left: rect.left + rect.width / 2,
    });
  }, []);

  const hideHeaderTooltip = useCallback(() => setHeaderTooltip(null), []);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", effectiveDark);
  }, [effectiveDark]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarDropdownRef.current &&
        !calendarDropdownRef.current.contains(event.target as Node)
      ) {
        setCalendarMenuOpen(false);
      }
      if (
        modeDropdownRef.current &&
        !modeDropdownRef.current.contains(event.target as Node)
      ) {
        setModeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarMenuOpen, isModeMenuOpen]);

  const headerTooltipPortal =
    headerTooltip &&
    createPortal(
      <span
        className="header-tooltip-portal"
        style={{
          position: "fixed",
          top: headerTooltip.top,
          left: headerTooltip.left,
          transform: "translate(-50%, 0)",
          margin: 0,
        }}
      >
        {headerTooltip.label}
      </span>,
      document.body
    );

  return (
    <div
      className="header-v2"
      id="header_v2"
      style={{ ["--background" as string]: "#FFFFFF" }}
    >
      {headerTooltipPortal}
      <div className="container flex-betweenitems">
        {/* Left section */}
        <div className="container__header header-v2-left h-100">
          <div className="collapse-sidebar">
            <button
              type="button"
              className={`btn-sidebar items-collapse${isSidebarOpen ? " active" : ""}`}
              onClick={() => onToggleSidebar?.()}
              aria-label={isSidebarOpen ? "Ocultar menú" : "Mostrar menú"}
              aria-expanded={isSidebarOpen}
            >
              <div className="default">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 16C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H5C4.44772 18 4 17.5523 4 17C4 16.4477 4.44772 16 5 16H15ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H19ZM19 6C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H19Z" fill="var(--color-icon)" />
                </svg>
              </div>
              <div className="active">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711L6.41421 12L11.7071 17.2929C12.0976 17.6834 12.0976 18.3166 11.7071 18.7071C11.3166 19.0976 10.6834 19.0976 10.2929 18.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L10.2929 5.29289ZM19 16C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H19ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H10C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11H19ZM19 6C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H15C14.4477 8 14 7.55228 14 7C14 6.44772 14.4477 6 15 6H19Z" fill="var(--color-icon)" />
                </svg>
              </div>
            </button>
          </div>
          <Link className="logo" to="/app">
            <img src="/login/logo icon.png" alt="Ivy Green Desk" width={32} height={32} />
          </Link>
          <div
            ref={calendarDropdownRef}
            className={`wrap-nav nav-menu v2-dropdown calendar-dropdown${isCalendarMenuOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="dropbtn v2-btn-default nav"
              onClick={() => setCalendarMenuOpen((prev) => !prev)}
              aria-expanded={isCalendarMenuOpen}
              aria-haspopup="true"
            >
              <span className="nav-selector-icon material-symbols-outlined">
                {selectedOption.icon}
              </span>
              <p className="nav__label is-nav-items">{selectedOption.label}</p>
              <span className="arrow">
                <IconArrowDown />
              </span>
            </button>
            <div className="v2-dropdown__menu">
              <ul>
                {navOptions.map((opt) => (
                  <li
                    key={opt.path}
                    className={`items has-icon${selectedOption.path === opt.path ? " is-selected" : ""}`}
                  >
                    <Link
                      to={opt.path}
                      className="nav-dropdown-link"
                      onClick={() => setCalendarMenuOpen(false)}
                    >
                      <span className="nav-dropdown-link__icon">
                        <span className="material-symbols-outlined">{opt.icon}</span>
                      </span>
                      <span>{opt.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="horizontal-menu mr-1 dp-flex flexcenter" />
        </div>

        {/* Right section */}
        <div className="container__header header-v2-right h-100">
          <form autoComplete="off" className="search-form relative" onSubmit={(e) => e.preventDefault()}>
            <span className="svg-search-absolute">
              <IconSearch />
            </span>
            <input
              id="search-ip"
              className="search-ip"
              type="text"
              name="term"
              placeholder="Search ..."
            />
            <span className="key absolute">ALT+S</span>
            <div id="globalSearch" className="search-dropdown">
              <div className="scrolls" />
            </div>
          </form>

          <div className="v2-dropdown add-menu wrap-btn-primary">
            <span className="btn-primary --icon svg-white">
              <IconPlus />
            </span>
            <div id="show_list_quick_add" className="v2-dropdown__menu --center">
              <ul className="relative">
                <div className="arrow"><i className="up" /></div>
                <li
                  className="items has-icon"
                  tabIndex={0}
                  role="button"
                  onClick={() => openModal()}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); } }}
                >
                  <span className="material-symbols-outlined">person_add</span>
                  <span>New Customer</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="is-divider" />
          <div className="boxs-notification notifi nav-sms">
            <div className="notify-btn tooltip dp-hide" title="SMS">SMS</div>
          </div>
          <div className="boxs-notification notifi nav-notification tabs-notify">
            <div
              className="btn-notification notify-btn tooltip"
              title="Notifications"
              onMouseEnter={(e) => showHeaderTooltip("Notifications", e.currentTarget)}
              onMouseLeave={hideHeaderTooltip}
            >
              <span className="material-symbols-outlined">siren</span>
            </div>
          </div>
          <div className="boxs-notification notifi nav-inbox">
            <div
              className="notify-btn tooltip"
              title="Inbox"
              onMouseEnter={(e) => showHeaderTooltip("Inbox", e.currentTarget)}
              onMouseLeave={hideHeaderTooltip}
            >
              <span className="material-symbols-outlined">mail</span>
            </div>
          </div>
          <div className="is-divider ml-1" />
          <div
            ref={modeDropdownRef}
            className={`v2-dropdown dropdown-dark-mode ml-1 mode-dropdown${isModeMenuOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="dropbtn v2-btn-default --sm tooltip"
              title={effectiveDark ? "Dark Mode" : "Light Mode"}
              onClick={() => setModeMenuOpen((prev) => !prev)}
              aria-expanded={isModeMenuOpen}
              aria-haspopup="true"
              aria-label="Seleccionar modo claro u oscuro"
            >
              <span className="material-symbols-outlined">
                {effectiveDark ? "moon_stars" : "clear_day"}
              </span>
            </button>
            <div className="v2-dropdown__menu v2-dropdown__menu--mode --right">
              <div className="flexcenter gap-8 mode-dropdown__content">
                <p className="flex-1 black fw-500">Mode</p>
                <div className="tabs">
                  <div className="tab-selectors btn-item ml-0">
                    <button
                      type="button"
                      className={`tab-items flex-1 flexcenter gap-4 svg-noeffect${theme === "light" ? " active-tab-selector" : ""}`}
                      onClick={() => { setTheme("light"); setModeMenuOpen(false); }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.8496C12.359 17.8496 12.6504 18.141 12.6504 18.5V19C12.6504 19.359 12.359 19.6504 12 19.6504C11.641 19.6504 11.3496 19.359 11.3496 19V18.5C11.3496 18.141 11.641 17.8496 12 17.8496ZM8.18652 17.3018C8.366 16.9909 8.76432 16.8841 9.0752 17.0635C9.38605 17.243 9.49289 17.6413 9.31348 17.9521L9.06348 18.3848C8.88398 18.6957 8.48569 18.8025 8.1748 18.623C7.86397 18.4435 7.75705 18.0452 7.93652 17.7344L8.18652 17.3018ZM14.9346 17.0645C15.2455 16.885 15.6437 16.9918 15.8232 17.3027L16.0732 17.7354C16.2527 18.0462 16.1458 18.4445 15.835 18.624C15.5241 18.8034 15.1258 18.6966 14.9463 18.3857L14.6963 17.9531C14.5168 17.6423 14.6237 17.244 14.9346 17.0645ZM12 6.84961C14.8443 6.84961 17.1504 9.15573 17.1504 12C17.1504 14.8443 14.8443 17.1504 12 17.1504C9.15573 17.1504 6.84961 14.8443 6.84961 12C6.84961 9.15573 9.15573 6.84961 12 6.84961ZM6.04785 14.6826C6.35873 14.5032 6.75705 14.61 6.93652 14.9209C7.11594 15.2318 7.0091 15.6301 6.69824 15.8096L6.26562 16.0596C5.95476 16.239 5.55647 16.1321 5.37695 15.8213C5.19746 15.5104 5.30434 15.1121 5.61523 14.9326L6.04785 14.6826ZM17.0742 14.9209C17.2537 14.6101 17.652 14.5031 17.9629 14.6826L18.3955 14.9326C18.7064 15.1121 18.8132 15.5104 18.6338 15.8213C18.4543 16.1321 18.056 16.239 17.7451 16.0596L17.3125 15.8096C17.0016 15.6301 16.8947 15.2318 17.0742 14.9209ZM12 8.15039C9.8737 8.15039 8.15039 9.8737 8.15039 12C8.15039 14.1263 9.8737 15.8496 12 15.8496C14.1263 15.8496 15.8496 14.1263 15.8496 12C15.8496 9.8737 14.1263 8.15039 12 8.15039ZM5.50586 11.3438C5.86484 11.3438 6.15625 11.6352 6.15625 11.9941C6.15625 12.3531 5.86484 12.6445 5.50586 12.6445H5.00586C4.64687 12.6445 4.35547 12.3531 4.35547 11.9941C4.35547 11.6352 4.64687 11.3438 5.00586 11.3438H5.50586ZM19.0059 11.3438C19.3648 11.3438 19.6562 11.6352 19.6562 11.9941C19.6562 12.3531 19.3648 12.6445 19.0059 12.6445H18.5059C18.1469 12.6445 17.8555 12.3531 17.8555 11.9941C17.8555 11.6352 18.1469 11.3438 18.5059 11.3438H19.0059ZM5.38281 8.1709C5.56233 7.86007 5.96062 7.75314 6.27148 7.93262L6.7041 8.18262C7.01496 8.36209 7.1218 8.76041 6.94238 9.07129C6.76291 9.38215 6.36459 9.48899 6.05371 9.30957L5.62109 9.05957C5.3102 8.88008 5.20332 8.48179 5.38281 8.1709ZM17.7393 7.93262C18.0501 7.7532 18.4485 7.86004 18.6279 8.1709C18.8073 8.48177 18.7005 8.8801 18.3896 9.05957L17.957 9.30957C17.6462 9.48905 17.2479 9.38212 17.0684 9.07129C16.8889 8.7604 16.9958 8.36211 17.3066 8.18262L17.7393 7.93262ZM8.18457 5.37305C8.49546 5.19355 8.89375 5.30044 9.07324 5.61133L9.32324 6.04395C9.50266 6.35482 9.39582 6.75314 9.08496 6.93262C8.77409 7.11203 8.37576 7.00519 8.19629 6.69434L7.94629 6.26172C7.76681 5.95085 7.87374 5.55256 8.18457 5.37305ZM14.9365 5.61035C15.116 5.29949 15.5143 5.19266 15.8252 5.37207C16.1361 5.55154 16.2429 5.94987 16.0635 6.26074L15.8135 6.69336C15.634 7.00425 15.2357 7.11113 14.9248 6.93164C14.614 6.75213 14.507 6.35383 14.6865 6.04297L14.9365 5.61035ZM12 4.34961C12.359 4.34961 12.6504 4.64101 12.6504 5V5.5C12.6504 5.85899 12.359 6.15039 12 6.15039C11.641 6.15039 11.3496 5.85899 11.3496 5.5V5C11.3496 4.64101 11.641 4.34961 12 4.34961Z" fill="var(--color-icon)" />
                      </svg>
                      <span>Light</span>
                    </button>
                    <button
                      type="button"
                      className={`tab-items flex-1 flexcenter gap-4 svg-noeffect${theme === "dark" ? " active-tab-selector" : ""}`}
                      onClick={() => { setTheme("dark"); setModeMenuOpen(false); }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5821 14.5586L20.198 14.7663C20.2904 14.4924 20.1908 14.1904 19.9536 14.0252C19.7163 13.86 19.3985 13.8713 19.1736 14.053L19.5821 14.5586ZM12.0342 4.00007L12.3813 4.54966C12.6255 4.39541 12.7387 4.09843 12.659 3.82073C12.5793 3.54304 12.3258 3.35129 12.0369 3.35008L12.0342 4.00007ZM19.1736 14.053C18.1692 14.8645 16.8922 15.35 15.5 15.35V16.65C17.2002 16.65 18.7634 16.0557 19.9906 15.0642L19.1736 14.053ZM15.5 15.35C12.2691 15.35 9.65 12.7309 9.65 9.5H8.35C8.35 13.4488 11.5512 16.65 15.5 16.65V15.35ZM9.65 9.5C9.65 7.41656 10.7387 5.58692 12.3813 4.54966L11.6871 3.45048C9.68328 4.71588 8.35 6.952 8.35 9.5H9.65ZM12 4.65C12.0105 4.65 12.021 4.65002 12.0315 4.65007L12.0369 3.35008C12.0246 3.35003 12.0123 3.35 12 3.35V4.65ZM4.65 12C4.65 7.94071 7.94071 4.65 12 4.65V3.35C7.22274 3.35 3.35 7.22274 3.35 12H4.65ZM12 19.35C7.94071 19.35 4.65 16.0593 4.65 12H3.35C3.35 16.7773 7.22274 20.65 12 20.65V19.35ZM18.9662 14.3508C17.9855 17.2581 15.2362 19.35 12 19.35V20.65C15.8108 20.65 19.0444 18.1861 20.198 14.7663L18.9662 14.3508Z" fill="var(--color-icon)" />
                      </svg>
                      <span>Dark</span>
                    </button>
                    <button
                      type="button"
                      className={`tab-items flex-1 flexcenter gap-4 svg-noeffect${theme === "system" ? " active-tab-selector" : ""}`}
                      onClick={() => { setTheme("system"); setModeMenuOpen(false); }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>settings</span>
                      <span>System</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="v2-dropdown wrap-nav nav-user">
            <div className="dropbtn v2-btn-default nav">
              <div className="avatar relative flexcenter">
                <img loading="lazy" src="/login/logo icon.png" alt="Ivy Green Desk" width={32} height={32} className="avt-img --lg" />
              </div>
              <span className="nav__label">IVY</span>
              <span className="arrow"><IconArrowDown /></span>
            </div>
            <div className="v2-dropdown__menu user-content --right scrolls">
              <ul>
                <li className="items has-icon">Sync to Google Calendar</li>
                <li className="items has-icon">
                  <Link to="/app/settings/account" className="nav-dropdown-link">My Account</Link>
                </li>
                <li className="items has-icon">Upgrade Plan</li>
                <li className="line" />
                <li className="items has-icon">
                  <Link to="/login" className="nav-dropdown-link">Log out</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
