import React, { useEffect, useState } from "react";

type ScheduleListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TOOLTIP_SVG = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="8" fill="#7A83A6" />
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11ZM7.9998 3.25281C9.68874 3.25281 10.75 3.98978 10.75 5.99999C10.75 7.08162 10.3335 7.57488 9.39526 8.09934L9.36601 8.1157C8.83795 8.41104 8.7498 8.51866 8.7498 8.99999C8.7498 9.41421 8.41402 9.74999 7.9998 9.74999C7.58559 9.74999 7.2498 9.41421 7.2498 8.99999C7.2498 7.86609 7.68129 7.33929 8.6338 6.80655L8.66334 6.79003C9.17748 6.50262 9.25 6.41675 9.25 5.99999C9.25 4.95947 8.95241 4.75281 7.9998 4.75281C7.27298 4.75281 6.75 5.17814 6.75 5.99999C6.75 6.41421 6.41421 6.74999 6 6.74999C5.58579 6.74999 5.25 6.41421 5.25 5.99999C5.25 4.27345 6.50497 3.25281 7.9998 3.25281Z"
        fill="white"
      />
    </g>
  </svg>
);

type ScheduleItem = { id: number; name: string; avatar: string; checked?: boolean };

const DEFAULT_SCHEDULES: ScheduleItem[] = [
  { id: 34, name: 'ANTONIO "5"', avatar: "https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_1.jpg" },
  { id: 68, name: 'ANDRES "2"', avatar: "https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_4.jpg" },
  { id: 69, name: 'ALVARO "3"', avatar: "https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_3.jpg" },
  { id: 70, name: 'ISBI "7"', avatar: "https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_2.jpg" },
  { id: 71, name: 'JOSE LUIS "1"', avatar: "https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_2.jpg" },
  { id: 72, name: "HECTOR", avatar: "https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_1.jpg", checked: true },
];

export const ScheduleListModal: React.FC<ScheduleListModalProps> = ({ isOpen, onClose }) => {
  const [allSchedulesChecked, setAllSchedulesChecked] = useState(true);
  const [workPoolOn, setWorkPoolOn] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleItem[]>(() =>
    DEFAULT_SCHEDULES.map((s) => ({ ...s, checked: s.checked ?? false }))
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSelectAll = (checked: boolean) => {
    setAllSchedulesChecked(checked);
    setSchedules((prev) => prev.map((s) => ({ ...s, checked })));
  };

  const handleScheduleToggle = (id: number, checked: boolean) => {
    setSchedules((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, checked } : s));
      setAllSchedulesChecked(next.every((s) => s.checked));
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="ReactModalPortal ReactModalPortal-schedule" aria-modal="true" role="dialog">
      <div
        className="ReactModal__Overlay ReactModal__Overlay--after-open"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-schedule-list open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxHeight: "90vh",
            width: "100%",
            maxWidth: "400px",
            background: "var(--bg-body, #fff)",
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
          }}
        >
          <div className="modal__container">
            <div id="show_list_schedule_group" className="list-schedules">
              <div className="sidebar-modal flex-column" style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
                <div className="btn-modal" style={{ flexShrink: 0, padding: "0.75rem 1rem" }}>
                  <button type="button" className="v2-btn-main fw-normal w-100 justify-center" onClick={onClose}>
                    Update
                  </button>
                </div>
                <div className="list-schedules__boxs --box-group flex-1 is-disable" style={{ padding: "0 1rem 0.5rem" }}>
                  <div className="mt-1">
                    <div className="items">
                      <div className="check-items">
                        <input
                          id="check-box-select-all-schedules"
                          type="checkbox"
                          checked={allSchedulesChecked}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                        <div className="item-checkbox ">
                          <label className="" htmlFor="check-box-select-all-schedules">
                            <span className="txt-ellipsis">All Schedules</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="work-pool flexcenter" style={{ padding: "0.75rem 1rem", gap: "1rem", alignItems: "center", borderTop: "1px solid var(--border-color, #e5e7eb)" }}>
                  <div className="flexcenter gap-4 flex-1" style={{ alignItems: "center", gap: "0.5rem", flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "14px" }}>Work Pool</p>
                    <p className="tooltip d-flex" style={{ margin: 0 }}>
                      {TOOLTIP_SVG}
                      <span className="tooltiptext top">
                        The work pool is a very temporary holding place where you may need to move jobs off the schedule. It is not ideal to have many jobs in the work pool.
                      </span>
                    </p>
                  </div>
                  <div className="switch large" title={workPoolOn ? "On" : "Off"}>
                    <span className="switch__label cursor-pointer" onClick={() => setWorkPoolOn((v) => !v)}>
                      {workPoolOn ? "On" : "Off"}
                    </span>
                    <input
                      id="gdSwitchCheckbox"
                      className="toggle toggle-round label-enabled"
                      type="checkbox"
                      checked={workPoolOn}
                      onChange={(e) => setWorkPoolOn(e.target.checked)}
                    />
                    <label htmlFor="gdSwitchCheckbox" />
                  </div>
                </div>
                <div className="list-schedules__boxs --box-schedule" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 1rem 1rem" }}>
                  <div className="list-group group-sm">
                    <div className="item-group --without-group">
                      {schedules.map((schedule) => (
                        <div key={schedule.id} title={schedule.name} className={`items ${schedule.checked ? "active-item" : ""}`}>
                          <div className="check-items">
                            <input
                              id={`check-box-schedule-withoutGroup-${schedule.id}`}
                              type="checkbox"
                              checked={schedule.checked}
                              onChange={(e) => handleScheduleToggle(schedule.id, e.target.checked)}
                            />
                            <div className="item-checkbox ">
                              <label className="" htmlFor={`check-box-schedule-withoutGroup-${schedule.id}`}>
                                <div className="avt-img">
                                  <img src={schedule.avatar} width={24} height={24} alt="" />
                                </div>
                                <span className="txt-ellipsis">{schedule.name}</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
