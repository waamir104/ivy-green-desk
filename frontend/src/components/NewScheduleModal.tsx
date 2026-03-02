import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ScheduleColorInput } from "./ScheduleColorInput";

const DEFAULT_AVATAR = "/login/logo icon.png";

/** Same users as Settings → Users (id + name + avatar for Assign to dropdown) */
const SCHEDULE_USER_OPTIONS: { id: string; name: string; avatar: string }[] = [
  { id: "1", name: "IVY GREEN", avatar: DEFAULT_AVATAR },
  { id: "2", name: "ANDRES CREW2", avatar: DEFAULT_AVATAR },
  { id: "3", name: "CREW 7 ISBI", avatar: DEFAULT_AVATAR },
  { id: "4", name: "ANTONIO CREW 5", avatar: DEFAULT_AVATAR },
  { id: "5", name: "CREW  1 JOSE", avatar: DEFAULT_AVATAR },
  { id: "6", name: "ALVARO crew 3", avatar: DEFAULT_AVATAR },
  { id: "7", name: "ROSENDO CREW650", avatar: DEFAULT_AVATAR },
];

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5L6 8.5L9.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type NewScheduleFormData = {
  name: string;
  color: string;
  nickname: string;
  assignTo: string;
  startAddress: string;
  endAddress: string;
};

type NewScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: NewScheduleFormData) => void;
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DEFAULT_COLOR = "#045AF9";

export const NewScheduleModal: React.FC<NewScheduleModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [nickname, setNickname] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [assignToOpen, setAssignToOpen] = useState(false);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const assignToRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!assignToOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (assignToRef.current && !assignToRef.current.contains(e.target as Node)) setAssignToOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [assignToOpen]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setColor(DEFAULT_COLOR);
      setNickname("");
      setAssignTo(SCHEDULE_USER_OPTIONS[0]?.id ?? "");
      setAssignToOpen(false);
      setStartAddress("");
      setEndAddress("");
    }
  }, [isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedUser = SCHEDULE_USER_OPTIONS.find((u) => u.id === assignTo);
    onSave?.({
      name,
      color,
      nickname,
      assignTo: selectedUser?.name ?? "",
      startAddress,
      endAddress,
    });
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
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
          id="new_schedule_modal"
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-newschedule open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-schedule-title"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            height: "auto",
            maxHeight: "90vh",
            width: "100%",
            maxWidth: "600px",
            background: "var(--bg-body, #fff)",
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            overflowY: "auto",
          }}
        >
          <div className="modal__container">
            <div className="header-modal">
              <h3 id="new-schedule-title" className="header-modal__label">New Schedule</h3>
              <button
                type="button"
                className="v2-btn-default --icon-lg --transparent"
                tabIndex={0}
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <form id="new-schedule-modal-form" className="new-schedule-form__container" onSubmit={handleSubmit}>
              <div className="body-modal scrolls new-schedule-form__body">
                <div className="new-schedule-form__content">
                  <div className="new-schedule-form__field new-schedule-form__field--full">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="new-schedule-form__row new-schedule-form__row--gap">
                    <div className="new-schedule-form__field">
                      <label>Color</label>
                      <div className="new-schedule-form__color-wrap">
                        <ScheduleColorInput
                          value={color}
                          onChange={setColor}
                          aria-label="Schedule color"
                        />
                      </div>
                    </div>
                    <div className="new-schedule-form__field">
                      <label>Nickname</label>
                      <input
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="new-schedule-form__field new-schedule-form__field--full">
                    <label>Assign to</label>
                    <div ref={assignToRef} className="new-schedule-form__assign-to-dropdown">
                      <button
                        type="button"
                        className="new-schedule-form__assign-to-wrap"
                        onClick={() => setAssignToOpen((o) => !o)}
                        aria-expanded={assignToOpen}
                        aria-haspopup="listbox"
                        aria-label="Assign to"
                      >
                        <img
                          src={SCHEDULE_USER_OPTIONS.find((u) => u.id === assignTo)?.avatar ?? DEFAULT_AVATAR}
                          alt=""
                          className="new-schedule-form__assign-to-logo"
                          width={22}
                          height={22}
                        />
                        <span className="new-schedule-form__assign-to-value">
                          {SCHEDULE_USER_OPTIONS.find((u) => u.id === assignTo)?.name ?? ""}
                        </span>
                        <span className="new-schedule-form__assign-to-chevron">
                          <ChevronDownIcon />
                        </span>
                      </button>
                      {assignToOpen && (
                        <ul
                          className="new-schedule-form__assign-to-list"
                          role="listbox"
                          aria-label="Assign to options"
                        >
                          {SCHEDULE_USER_OPTIONS.map((u) => (
                            <li
                              key={u.id}
                              role="option"
                              aria-selected={assignTo === u.id}
                              className={`new-schedule-form__assign-to-option${assignTo === u.id ? " is-selected" : ""}`}
                              onClick={() => {
                                setAssignTo(u.id);
                                setAssignToOpen(false);
                              }}
                            >
                              <img src={u.avatar} alt="" className="new-schedule-form__assign-to-option-avatar" width={22} height={22} />
                              <span className="new-schedule-form__assign-to-option-name">{u.name}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="new-schedule-form__field new-schedule-form__field--full">
                    <label>Start address</label>
                    <input
                      type="text"
                      placeholder="Start address"
                      value={startAddress}
                      onChange={(e) => setStartAddress(e.target.value)}
                    />
                  </div>
                  <div className="new-schedule-form__field new-schedule-form__field--full">
                    <label>End address</label>
                    <input
                      type="text"
                      placeholder="End address"
                      value={endAddress}
                      onChange={(e) => setEndAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="footer-modal btn-close">
                <button type="button" className="v2-btn-default --transparent" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="v2-btn-main">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
