import React, { useState } from "react";

const DEFAULT_AVATAR = "/login/logo icon.png";

type NewUserFormProps = {
  onClose: () => void;
  onSave?: (data: Record<string, string>) => void;
};

export const NewUserForm: React.FC<NewUserFormProps> = ({ onClose, onSave }) => {
  const [adminPermissions, setAdminPermissions] = useState(false);
  const [technicianPermissions, setTechnicianPermissions] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [technicianOpen, setTechnicianOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({});
    onClose();
  };

  return (
    <div className="new-user-form__page">
      <form className="new-user-form__container" onSubmit={handleSubmit}>
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

        <div className="new-user-form__footer">
          <button type="button" className="new-user-form__btn new-user-form__btn--secondary" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="new-user-form__btn new-user-form__btn--primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
