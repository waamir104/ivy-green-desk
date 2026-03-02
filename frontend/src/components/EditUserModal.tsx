import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type UserForEdit = {
  id: string;
  avatar: string;
  name: string;
  date: string;
  role: string;
  schedule: string;
  firstName: string;
  lastName: string;
  username: string;
  license: string;
  email: string;
};

type EditUserModalProps = {
  user: UserForEdit | null;
  onClose: () => void;
  onSave?: (data: Partial<UserForEdit>) => void;
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [adminPermissions, setAdminPermissions] = useState(false);
  const [technicianPermissions, setTechnicianPermissions] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [technicianOpen, setTechnicianOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUsername(user.username);
      setLicense(user.license);
      setEmail(user.email);
      setAdminPermissions(user.role === "Super Admin" || user.role === "Admin");
      setTechnicianPermissions(user.role === "Technician" || user.role === "Admin" || user.role === "Super Admin");
      setAdminOpen(false);
      setTechnicianOpen(false);
    }
  }, [user]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (user) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [user, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({
      firstName,
      lastName,
      username,
      license,
      email,
    });
    onClose();
  };

  if (!user) return null;

  const modalContent = (
    <div className="ReactModalPortal ReactModalPortal-edit-user" aria-modal="true" role="dialog">
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
          id="edit_user_modal"
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-edituser open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-user-title"
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
              <h3 id="edit-user-title" className="header-modal__label">Edit User</h3>
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

            <form id="edit-user-modal-form" className="new-user-form__container" onSubmit={handleSubmit}>
              <div className="body-modal scrolls new-user-form__body">
                <div className="new-user-form__content">
                  <div className="new-user-form__avatar-row">
                    <div className="new-user-form__avatar-wrap">
                      <img src={user.avatar} alt="" className="new-user-form__avatar" width={40} height={40} />
                      <span className="material-symbols-outlined new-user-form__avatar-caret">expand_more</span>
                    </div>
                    <button type="button" className="new-user-form__btn-upload">
                      Upload New Avatar
                    </button>
                  </div>

                  <div className="new-user-form__row">
                    <div className="new-user-form__field">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="new-user-form__field">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="new-user-form__row">
                    <div className="new-user-form__field">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="new-user-form__field">
                      <label>License</label>
                      <input
                        type="text"
                        placeholder="License"
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="new-user-form__field new-user-form__field--full">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
