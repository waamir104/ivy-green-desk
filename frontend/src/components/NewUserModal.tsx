import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DEFAULT_AVATAR = "/login/logo icon.png";

type NewUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: Record<string, string>) => void;
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NewUserModal: React.FC<NewUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [adminPermissions, setAdminPermissions] = useState(false);
  const [technicianPermissions, setTechnicianPermissions] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [technicianOpen, setTechnicianOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAdminPermissions(false);
      setTechnicianPermissions(true);
      setAdminOpen(false);
      setTechnicianOpen(false);
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
    onSave?.({});
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="ReactModalPortal ReactModalPortal-user" aria-modal="true" role="dialog">
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
          id="new_user_modal"
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-newuser open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-user-title"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxHeight: "90vh",
            width: "100%",
            maxWidth: "600px",
            background: "var(--bg-body, #fff)",
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
          }}
        >
          <div className="modal__container">
            <div className="header-modal">
              <h3 id="new-user-title" className="header-modal__label">New User</h3>
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

            <form id="new-user-modal-form" className="new-user-form__container" onSubmit={handleSubmit}>
              <div className="body-modal scrolls new-user-form__body">
                <div className="new-user-form__content">
                  <div className="new-user-form__avatar-row">
                    <div className="new-user-form__avatar-wrap">
                      <img src={DEFAULT_AVATAR} alt="" className="new-user-form__avatar" width={40} height={40} />
                      <span className="material-symbols-outlined new-user-form__avatar-caret">expand_more</span>
                    </div>
                    <button type="button" className="new-user-form__btn-upload">
                      Upload New Avatar
                    </button>
                  </div>

                  <div className="new-user-form__row">
                    <div className="new-user-form__field">
                      <label>First Name</label>
                      <input type="text" placeholder="First Name" />
                    </div>
                    <div className="new-user-form__field">
                      <label>Last Name</label>
                      <input type="text" placeholder="Last Name" />
                    </div>
                  </div>

                  <div className="new-user-form__row">
                    <div className="new-user-form__field">
                      <label>Username</label>
                      <input type="text" placeholder="Username" />
                    </div>
                    <div className="new-user-form__field">
                      <label>License</label>
                      <input type="text" placeholder="License" />
                    </div>
                  </div>

                  <div className="new-user-form__field new-user-form__field--full">
                    <label>Email</label>
                    <input type="email" placeholder="Email" />
                  </div>

                  <div className="new-user-form__row">
                    <div className="new-user-form__field">
                      <label>New password</label>
                      <input type="password" placeholder="At least 7 characters 1 number 1 uppercase" />
                    </div>
                    <div className="new-user-form__field">
                      <label>Confirm password</label>
                      <input type="password" placeholder="Enter password again" />
                    </div>
                  </div>

                  <div className="new-user-form__permissions">
                    <div className="new-user-form__permission-row">
                      <span className="new-user-form__permission-label">Admin Permissions</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={adminPermissions}
                        className={`new-user-form__toggle${adminPermissions ? " is-on" : ""}`}
                        onClick={() => setAdminPermissions((v) => !v)}
                      />
                      <button
                        type="button"
                        className={`new-user-form__collapse${adminOpen ? " is-open" : ""}`}
                        onClick={() => setAdminOpen((o) => !o)}
                        aria-expanded={adminOpen}
                      >
                        <span className="material-symbols-outlined">expand_less</span>
                      </button>
                    </div>
                    <div className="new-user-form__permission-row">
                      <span className="new-user-form__permission-label">Technician Permissions</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={technicianPermissions}
                        className={`new-user-form__toggle${technicianPermissions ? " is-on" : ""}`}
                        onClick={() => setTechnicianPermissions((v) => !v)}
                      />
                      <button
                        type="button"
                        className={`new-user-form__collapse${technicianOpen ? " is-open" : ""}`}
                        onClick={() => setTechnicianOpen((o) => !o)}
                        aria-expanded={technicianOpen}
                      >
                        <span className="material-symbols-outlined">expand_less</span>
                      </button>
                    </div>
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
