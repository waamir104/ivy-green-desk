import { useState } from "react";

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 5.5L8 12L14.5 18.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 5.5L16 12L9.5 18.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatMonthTitle = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [mapVisible, setMapVisible] = useState(true);
  const [viewRange, setViewRange] = useState<"Month" | "Week" | "Day">("Month");
  const [workpoolTab, setWorkpoolTab] = useState<"pool" | "missed">("pool");

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
            <header className="calendar-layout__header header">
              <div className="header__left left">
                <button
                  type="button"
                  className={`header__btn-map ${mapVisible ? "active" : ""}`}
                  onClick={() => setMapVisible((v) => !v)}
                >
                  Map
                </button>
                <select
                  className="header__select"
                  value={viewRange}
                  onChange={(e) => setViewRange(e.target.value as "Month" | "Week" | "Day")}
                >
                  <option value="Month">Month</option>
                  <option value="Week">Week</option>
                  <option value="Day">Day</option>
                </select>
              </div>

              <div className="header__center center">
                <button type="button" className="header__nav" onClick={goPrev} aria-label="Previous">
                  <ChevronLeft />
                </button>
                <span className="header__title">{formatMonthTitle(currentDate)}</span>
                <button type="button" className="header__nav" onClick={goNext} aria-label="Next">
                  <ChevronRight />
                </button>
              </div>

              <div className="header__right right">
                <button type="button" className="header__btn">Filter</button>
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

            <input type="text" placeholder="Search" className="workpool__search" />

            <div className="job-status">Job Status</div>

            <div className="drop-zone">Drag a job to the work pool</div>
          </div>
        </aside>
      </div>
    </div>
  );
};
