import { useState } from "react";
import { IconSearch, IconCalendar } from "../components/header/HeaderIcons";
import { ScheduleListModal } from "../components/ScheduleListModal";

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 7.5L8 11L11.5 7.5" stroke="var(--color-icon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 5.5L8 12L14.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 5.5L16 12L9.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronsLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 5.5L5 12L11.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 5.5L11 12L17.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronsRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 5.5L19 12L12.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 5.5L13 12L6.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconViewRows = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.78194 6.5H12.2181C12.6638 6.5 12.8255 6.54641 12.9884 6.63357C13.1514 6.72072 13.2793 6.84861 13.3664 7.01158C13.4536 7.17454 13.5 7.33618 13.5 7.78194V9.21806C13.5 9.66382 13.4536 9.82546 13.3664 9.98842C13.2793 10.1514 13.1514 10.2793 12.9884 10.3664C12.8255 10.4536 12.6638 10.5 12.2181 10.5H5.78194C5.33618 10.5 5.17454 10.4536 5.01158 10.3664C4.84861 10.2793 4.72072 10.1514 4.63357 9.98842C4.54641 9.82546 4.5 9.66382 4.5 9.21806V7.78194C4.5 7.33618 4.54641 7.17454 4.63357 7.01158C4.72072 6.84861 4.84861 6.72072 5.01158 6.63357C5.17454 6.54641 5.33618 6.5 5.78194 6.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.78194 13.5H18.2181C18.6638 13.5 18.8255 13.5464 18.9884 13.6336C19.1514 13.7207 19.2793 13.8486 19.3664 14.0116C19.4536 14.1745 19.5 14.3362 19.5 14.7819V16.2181C19.5 16.6638 19.4536 16.8255 19.3664 16.9884C19.2793 17.1514 19.1514 17.2793 18.9884 17.3664C18.8255 17.4536 18.6638 17.5 18.2181 17.5H5.78194C5.33618 17.5 5.17454 17.4536 5.01158 17.3664C4.84861 17.2793 4.72072 17.1514 4.63357 16.9884C4.54641 16.8255 4.5 16.6638 4.5 16.2181V14.7819C4.5 14.3362 4.54641 14.1745 4.63357 14.0116C4.72072 13.8486 4.84861 13.7207 5.01158 13.6336C5.17454 13.5464 5.33618 13.5 5.78194 13.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconViewColumns = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.78194 4.5H9.21806C9.66382 4.5 9.82546 4.54641 9.98842 4.63357C10.1514 4.72072 10.2793 4.84861 10.3664 5.01158C10.4536 5.17454 10.5 5.33618 10.5 5.78194V18.2181C10.5 18.6638 10.4536 18.8255 10.3664 18.9884C10.2793 19.1514 10.1514 19.2793 9.98842 19.3664C9.82546 19.4536 9.66382 19.5 9.21806 19.5H7.78194C7.33618 19.5 7.17454 19.4536 7.01158 19.3664C6.84861 19.2793 6.72072 19.1514 6.63357 18.9884C6.54641 18.8255 6.5 18.6638 6.5 18.2181V5.78194C6.5 5.33618 6.54641 5.17454 6.63357 5.01158C6.72072 4.84861 6.84861 4.72072 7.01158 4.63357C7.17454 4.54641 7.33618 4.5 7.78194 4.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M14.7819 4.5H16.2181C16.6638 4.5 16.8255 4.54641 16.9884 4.63357C17.1514 4.72072 17.2793 4.84861 17.3664 5.01158C17.4536 5.17454 17.5 5.33618 17.5 5.78194V12.2181C17.5 12.6638 17.4536 12.8255 17.3664 12.9884C17.2793 13.1514 17.1514 13.2793 16.9884 13.3664C16.8255 13.4536 16.6638 13.5 16.2181 13.5H14.7819C14.3362 13.5 14.1745 13.4536 14.0116 13.3664C13.8486 13.2793 13.7207 13.1514 13.6336 12.9884C13.5464 12.8255 13.5 12.6638 13.5 12.2181V5.78194C13.5 5.33618 13.5464 5.17454 13.6336 5.01158C13.7207 4.84861 13.8486 4.72072 14.0116 4.63357C14.1745 4.54641 14.3362 4.5 14.7819 4.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPalette = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.3884 8C15.9337 5.99601 14.1415 4.5 11.9999 4.5C9.85835 4.5 8.06618 5.99601 7.61145 8" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 19.0322C9.39752 19.3316 8.71842 19.5 8 19.5C5.51472 19.5 3.5 17.4853 3.5 15C3.5 12.5147 5.51472 10.5 8 10.5C8.71842 10.5 9.39752 10.6684 10 10.9678" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 19.5C18.4853 19.5 20.5 17.4853 20.5 15C20.5 12.5147 18.4853 10.5 16 10.5C13.5147 10.5 11.5 12.5147 11.5 15C11.5 17.4853 13.5147 19.5 16 19.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconDropup = () => (
  <svg width="8" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.39378 0H8.60622C9.3014 0 9.86495 0.612378 9.86495 1.36778C9.86495 1.68776 9.76171 1.99761 9.5732 2.24342L5.96698 6.94579C5.52194 7.52611 4.72823 7.60452 4.19417 7.12092C4.13569 7.06796 4.08175 7.00934 4.03301 6.94579L0.426789 2.24342C-0.0182539 1.6631 0.0539014 0.800623 0.587953 0.317024C0.814167 0.112181 1.09931 0 1.39378 0Z" fill="var(--color-icon)" />
  </svg>
);

const IconKebab = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="1.5" fill="var(--color-icon)" />
    <circle cx="12" cy="6" r="1.5" fill="var(--color-icon)" />
    <circle cx="12" cy="18" r="1.5" fill="var(--color-icon)" />
  </svg>
);

const IconRoute = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 6.5H15.0011C16.3812 6.5 17.5 7.61881 17.5 8.99894C17.5 10.3791 16.3812 11.4979 15.0011 11.4979H7.00106C5.61976 11.4979 4.5 12.6176 4.5 13.9989C4.5 15.3802 5.61976 16.5 7.00106 16.5H17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 8.5C7.60457 8.5 8.5 7.60457 8.5 6.5C8.5 5.39543 7.60457 4.5 6.5 4.5C5.39543 4.5 4.5 5.39543 4.5 6.5C4.5 7.60457 5.39543 8.5 6.5 8.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 18.4962L18.4962 16.4962L16.5 14.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBatchMove = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 17.5H16.5C17.6046 17.5 18.5 16.6046 18.5 15.5V8.5C18.5 7.39543 17.6046 6.5 16.5 6.5H15.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 5.5H13.5C14.6046 5.5 15.5 6.39543 15.5 7.5V16.5C15.5 17.6046 14.6046 18.5 13.5 18.5H7.5C6.39543 18.5 5.5 17.6046 5.5 16.5V7.5C5.5 6.39543 6.39543 5.5 7.5 5.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 13.5H13.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 15.5H11.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMessaging = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.68093 11.0771C5.5472 10.5769 6.41346 10.0768 7.27972 9.57667C9.09657 8.52771 10.5111 6.72568 11.5234 4.17058C11.7268 3.65711 12.308 3.40577 12.8214 3.6092C13.031 3.69223 13.2064 3.84366 13.3191 4.0389L18.0953 12.3114C18.3714 12.7897 18.2076 13.4013 17.7293 13.6774C17.534 13.7902 17.3064 13.8336 17.0834 13.8007C14.3645 13.3998 12.0966 13.7239 10.2797 14.7728C9.41346 15.273 8.5472 15.7731 7.68093 16.2732C6.72435 16.8255 5.50117 16.4978 4.94888 15.5412L3.94888 13.8091C3.3966 12.8525 3.72435 11.6294 4.68093 11.0771Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.27979 9.57665L10.2798 14.7728" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPrint = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 16.5H6.5C5.39543 16.5 4.5 15.6046 4.5 14.5V12V11.5C4.5 10.3954 5.39543 9.5 6.5 9.5H17.5C18.6046 9.5 19.5 10.3954 19.5 11.5V14.5C19.5 15.6046 18.6046 16.5 17.5 16.5H16.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 13.5H15.5C16.0523 13.5 16.5 13.9477 16.5 14.5V16.5C16.5 17.6046 15.6046 18.5 14.5 18.5H9.5C8.39543 18.5 7.5 17.6046 7.5 16.5V14.5C7.5 13.9477 7.94772 13.5 8.5 13.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 5.5H14.5C15.6046 5.5 16.5 6.39543 16.5 7.5V9.5H7.5V7.5C7.5 6.39543 8.39543 5.5 9.5 5.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 5.5L16 12L9.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatMonthTitle = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [mapVisible, setMapVisible] = useState(true);
  const [viewRange, setViewRange] = useState<"Month" | "Week" | "Day">("Month");
  const [viewMode, setViewMode] = useState<"rows" | "columns">("columns");
  const [workpoolTab, setWorkpoolTab] = useState<"pool" | "missed">("pool");
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [scheduleListModalOpen, setScheduleListModalOpen] = useState(false);

  const goPrev = () =>
    setCurrentDate((d) => {
      const n = new Date(d);
      n.setMonth(n.getMonth() - 1);
      return n;
    });
  const goNext = () =>
    setCurrentDate((d) => {
      const n = new Date(d);
      n.setMonth(n.getMonth() + 1);
      return n;
    });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
  const weeks = totalCells / 7;

  const getDayInfo = (cellIndex: number) => {
    const dayNum = cellIndex - startOffset + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return { empty: true as const, dayNum: 0 };
    return { empty: false as const, dayNum };
  };

  return (
    <div className="container-wrap calendar" id="main_page_full_calendar">
      <div className="calendar-layout container">
        <div className="calendar-layout__main">
          {/* First vertical div: header */}
          <div className="calendar-layout__header-wrap">
            <header className="calendar-layout__header calendar-header">
              <div className="left-menu flexcenter">
                <button
                  type="button"
                  id="btn-map-toggle"
                  className={`v2-btn-default btn-mapbox cursor ${mapVisible ? "active" : ""}`}
                  onClick={() => setMapVisible((v) => !v)}
                  title="Map"
                >
                  Map
                  <span className="switch-icon ml-1 has-toggle">
                    <span className="switch-icon__dots" />
                  </span>
                </button>
                <div className="v2-dropdown list-agenda">
                  <button type="button" className="dropbtn btn-agenda v2-btn-default --icon-r mr-0" title="View range">
                    <p className="txt-ellipsis">{viewRange}</p>
                    <span className="arrow"><ArrowDown /></span>
                  </button>
                </div>
                <div className="is-divider --h24 hide-mobile" />
                <div className="btn-viewtask tooltip">
                  <button
                    type="button"
                    className={`v2-btn-default --icon-lg icons-viewrows ${viewMode === "rows" ? "active" : ""}`}
                    onClick={() => setViewMode("rows")}
                    title="View Horizontal"
                  >
                    <IconViewRows />
                  </button>
                  <button
                    type="button"
                    className={`v2-btn-default --icon-lg icons-viewcolumns ${viewMode === "columns" ? "active" : ""}`}
                    onClick={() => setViewMode("columns")}
                    title="View Vertical"
                  >
                    <IconViewColumns />
                  </button>
                </div>
                <div className="v2-dropdown list-calendarcolor">
                  <button type="button" className="dropbtn v2-btn-default tooltip" title="Color Codes">
                    <span className="mr-1"><IconPalette /></span>
                    <span className="arrow"><ArrowDown /></span>
                  </button>
                </div>
                <div className="wrap-schedule-picker">
                  <div
                    className="wrap-schedule-picker__btn cursor-pointer"
                    title="Schedule"
                    role="button"
                    tabIndex={0}
                    onClick={() => setScheduleListModalOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setScheduleListModalOpen(true);
                      }
                    }}
                  >
                    <div className="avt-img tooltip">
                      <img src="https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_1.jpg" width={24} height={24} alt="" />
                    </div>
                    <span className="svg-dropup"><IconDropup /></span>
                  </div>
                </div>
              </div>

              <div className="center-menu relative">
                <div className="action">
                  <button type="button" className="btn-action tooltip" onClick={goPrev} title="Jump Back">
                    <ChevronsLeft />
                  </button>
                  <button type="button" className="btn-action tooltip" onClick={goPrev} title="Previous">
                    <ChevronLeft />
                  </button>
                  <button type="button" className="action__items v2-btn-default btn-today mr-0" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </button>
                  <span id="title-calendar-time" className="action__items time text-capitalize" title={formatMonthTitle(currentDate)}>
                    {formatMonthTitle(currentDate)}
                  </span>
                  <button type="button" className="btn-action tooltip" onClick={goNext} title="Next">
                    <ChevronRight />
                  </button>
                  <button type="button" className="btn-action tooltip" onClick={goNext} title="Jump Next">
                    <ChevronsRight />
                  </button>
                </div>
              </div>

              <div className="right-menu relative flexcenter">
                <div className="wrap-action relative">
                  <button
                    type="button"
                    className="wrap-action__btn v2-btn-default --icon-lg"
                    onClick={() => setActionsMenuOpen((o) => !o)}
                    aria-expanded={actionsMenuOpen}
                    title="More options"
                  >
                    <IconKebab />
                  </button>
                  {actionsMenuOpen && (
                    <div
                      className="v2-dropdown__menu v2-dropdown__menu--actions"
                      style={{ display: "block", top: "100%", right: 0, left: "auto", marginTop: "0.25rem" }}
                    >
                      <button type="button" className="v2-btn-default list-items">
                        <IconRoute />
                        <p>Route Optimizer</p>
                      </button>
                      <div className="v2-dropdown">
                        <button type="button" className="dropbtn v2-btn-default list-items">
                          <IconBatchMove />
                          <p className="flex-1">Batch Move</p>
                          <span className="arrow"><IconChevronRight /></span>
                        </button>
                      </div>
                      <div className="v2-dropdown">
                        <button type="button" className="dropbtn v2-btn-default list-items">
                          <IconMessaging />
                          <p className="flex-1">Messaging</p>
                          <span className="arrow"><IconChevronRight /></span>
                        </button>
                        <div className="v2-dropdown__menu content-full">
                          <ul>
                            <li><div className="items btn-modal">Send Reminders</div></li>
                            <li><div className="items btn-modal">Send Confirmations</div></li>
                            <li><div className="items btn-modal">Send a Broadcast</div></li>
                          </ul>
                        </div>
                      </div>
                      <button type="button" className="v2-btn-default list-items">
                        <IconPrint />
                        <p>Print Schedule</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>

          {/* Second vertical div: map (toggle) + calendar */}
          <div className="calendar-layout__content">
            {/* MAP */}
            {mapVisible && (
              <div className="calendar-layout__map map">
                <div className="map-placeholder">MAP</div>
              </div>
            )}

            {/* CALENDAR */}
            <div className="calendar-layout__calendar calendar">
          <div className="calendar-grid">
            {DAY_NAMES.map((name) => (
              <div key={name} className="day-name">
                {name}
              </div>
            ))}
            {/* Row 1 */}
            {Array.from({ length: 7 }, (_, i) => {
              const { empty, dayNum } = getDayInfo(i);
              if (empty)
                return <div key={`r1-${i}`} className="day" />;
              if (dayNum === 2)
                return (
                  <div key={`r1-${i}`} className="day event">
                    <span className="date">2</span>
                    <div className="card red">ZELLER BILL</div>
                  </div>
                );
              return (
                <div key={`r1-${i}`} className="day">
                  <span className="date">{dayNum}</span>
                </div>
              );
            })}
            {/* Row 2 */}
            {Array.from({ length: 7 }, (_, i) => {
              const { empty, dayNum } = getDayInfo(7 + i);
              if (empty)
                return <div key={`r2-${i}`} className="day" />;
              if (dayNum === 9)
                return (
                  <div key={`r2-${i}`} className="day">
                    <span className="date">9</span>
                    <div className="card">EDGEWOOD SUBDI</div>
                    <div className="card">GAMBILL BARBARA</div>
                  </div>
                );
              if (dayNum === 14)
                return (
                  <div key={`r2-${i}`} className="day holiday">
                    <span className="date">14</span>
                    <div className="holiday-label">Valentine&apos;s Day</div>
                  </div>
                );
              return (
                <div key={`r2-${i}`} className="day">
                  <span className="date">{dayNum}</span>
                </div>
              );
            })}
            {/* Row 3 */}
            {Array.from({ length: 7 }, (_, i) => {
              const { empty, dayNum } = getDayInfo(14 + i);
              if (empty)
                return <div key={`r3-${i}`} className="day" />;
              if (dayNum === 16)
                return (
                  <div key={`r3-${i}`} className="day holiday">
                    <span className="date">16</span>
                    <div className="holiday-label">Presidents Day</div>
                    <div className="card">ACOSTA MIKE</div>
                    <div className="card">TILLMAN BRETT</div>
                  </div>
                );
              if (dayNum === 17)
                return (
                  <div key={`r3-${i}`} className="day">
                    <span className="date">17</span>
                    <div className="card">LAKLY ANDREA</div>
                    <div className="card">Dan Fielder</div>
                  </div>
                );
              return (
                <div key={`r3-${i}`} className="day">
                  <span className="date">{dayNum}</span>
                </div>
              );
            })}
            {/* Extra rows to fill remaining weeks */}
            {Array.from({ length: (weeks - 3) * 7 }, (_, idx) => {
              const i = 21 + idx;
              const { empty, dayNum } = getDayInfo(i);
              if (empty)
                return <div key={`ex-${i}`} className="day" />;
              return (
                <div key={`ex-${i}`} className="day">
                  <span className="date">{dayNum}</span>
                </div>
              );
            })}
          </div>
          </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="calendar-layout__sidebar sidebar">
          <div className="mini-calendar">{formatMonthTitle(currentDate)}</div>

          <div className="workpool">
            <div className="work-header">
              <button
                type="button"
                className={workpoolTab === "pool" ? "active" : ""}
                onClick={() => setWorkpoolTab("pool")}
              >
                Pool
              </button>
              <button
                type="button"
                className={workpoolTab === "missed" ? "active" : ""}
                onClick={() => setWorkpoolTab("missed")}
              >
                Missed 99+
              </button>
            </div>

            <div className="workpool__search-wrap">
              <span className="svg-search-absolute">
                <IconSearch />
              </span>
              <input type="text" placeholder="Search" className="workpool__search" />
            </div>

            <div className="job-status">
              <span className="material-symbols-outlined">card_travel</span>
              Job Status
            </div>

            <div className="react-datepicker-wrapper select-list filter-date">
              <div className="react-datepicker__input-container">
                <div className="field-input field-date" role="button" tabIndex={0} onClick={() => {}} onKeyDown={() => {}}>
                  <IconCalendar />
                  <p className="field-date__select">Select Date Range...</p>
                </div>
              </div>
            </div>

            <div className="drop-zone">Drag a job to the work pool</div>
          </div>
        </aside>
      </div>

      <ScheduleListModal isOpen={scheduleListModalOpen} onClose={() => setScheduleListModalOpen(false)} />
    </div>
  );
};
