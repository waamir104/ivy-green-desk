import { useState, useEffect } from "react";
import { NewUserForm } from "./NewUserForm";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddUserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6Z" fill="var(--color-icon)" />
  </svg>
);

const DeviceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.5 5.5H16.5C17.6046 5.5 18.5 6.39543 18.5 7.5V12.5C18.5 13.6046 17.6046 14.5 16.5 14.5H6.5C5.39543 14.5 4.5 13.6046 4.5 12.5V7.5C4.5 6.39543 5.39543 5.5 6.5 5.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.5 18.5V14.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M9.5 18.5H13.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 15L12 8.5L18.5 15" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SessionHistoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 5.5L19 12L12.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 5.5L13 12L6.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type UserRole = "Super Admin" | "Admin" | "Technician";

interface User {
  id: string;
  avatar: string;
  name: string;
  date: string;
  role: UserRole;
  schedule: string;
  firstName: string;
  lastName: string;
  username: string;
  license: string;
  email: string;
}

interface Device {
  device: string;
  location: string;
  time: string;
}

const DEFAULT_AVATAR = "/login/logo icon.png";

const USERS: User[] = [
  { id: "1", avatar: DEFAULT_AVATAR, name: "IVY GREEN", date: "02/20/2026", role: "Super Admin", schedule: "Schedule 7", firstName: "IVY", lastName: "GREEN", username: "ivygreenlawncare@bellsouth.net", license: "", email: "ivygreenlawncare@bellsouth.net" },
  { id: "2", avatar: DEFAULT_AVATAR, name: "ANDRES CREW2", date: "11/24/2025", role: "Technician", schedule: "Schedule 3", firstName: "ANDRES", lastName: "CREW2", username: "", license: "", email: "" },
  { id: "3", avatar: DEFAULT_AVATAR, name: "CREW 7 ISBI", date: "10/31/2025", role: "Technician", schedule: "Schedule 5", firstName: "", lastName: "", username: "", license: "", email: "" },
  { id: "4", avatar: DEFAULT_AVATAR, name: "ANTONIO CREW 5", date: "10/28/2025", role: "Technician", schedule: "Schedule 2", firstName: "", lastName: "", username: "", license: "", email: "" },
  { id: "5", avatar: DEFAULT_AVATAR, name: "CREW  1 JOSE", date: "10/24/2025", role: "Technician", schedule: "Schedule 6", firstName: "", lastName: "", username: "", license: "", email: "" },
  { id: "6", avatar: DEFAULT_AVATAR, name: "ALVARO crew 3", date: "10/20/2025", role: "Admin", schedule: "Schedule 4", firstName: "", lastName: "", username: "", license: "", email: "" },
  { id: "7", avatar: DEFAULT_AVATAR, name: "ROSENDO CREW650", date: "04/02/2025", role: "Technician", schedule: "", firstName: "", lastName: "", username: "", license: "", email: "" },
];

const ACTIVE_DEVICES: Device[] = [
  { device: "Windows, Chrome 142.0.7444.265", location: "Colombia", time: "11 hours ago" },
  { device: "Windows, Chrome 145.0.0.0", location: "Colombia", time: "1 day ago" },
  { device: "Windows, Chrome 145.0.0.0", location: "Colombia", time: "2 days ago" },
  { device: "Windows, Chrome 145.0.0.0", location: "Colombia", time: "3 days ago" },
  { device: "Windows, Chrome 142.0.7444.235", location: "Colombia", time: "3 days ago" },
];

const ROLE_CLASS: Record<UserRole, string> = {
  "Super Admin": "--super-admin",
  "Admin": "--admin",
  "Technician": "--technician",
};

export const SettingsUsersPage = () => {
  const [selectedId, setSelectedId] = useState<string>(USERS[0].id);
  const [permissionsOpen, setPermissionsOpen] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const selected = USERS.find((u) => u.id === selectedId) ?? USERS[0];

  useEffect(() => {
    if (!detailLoading) return;
    const t = setTimeout(() => setDetailLoading(false), 800);
    return () => clearTimeout(t);
  }, [detailLoading]);

  const handleSelectUser = (userId: string) => {
    if (userId === selectedId) return;
    setDetailLoading(true);
    setSelectedId(userId);
  };

  return (
    <div className="contents-pages container-column contents-user">
      <div className="box-tips hide">
        <div className="box-tips__content">
          <div className="tip">
            <div className="title">
              <span className="fw-600 fs-15">undefined</span>
              <div className="cursor-pointer pl-2"><CloseIcon /></div>
            </div>
            <div className="description fs-14">undefined</div>
          </div>
        </div>
      </div>
      <div className="contents-user__details scrolls-x">
        <div className="wrap-list-items set-user-left">
          <div className="header-title">
            <div className="tabs">
              <div className="btn-item ml-0">
                <div className="tab-items flexcenter gap-2 svg-noeffect active-tab-selector">
                  <span>Users</span>
                </div>
              </div>
            </div>
            <button type="button" className="v2-btn-main has-icon svg-white btn-purple" onClick={() => setIsAddingUser(true)}>
              <div><AddUserIcon /></div>
              <span>Add User</span>
            </button>
          </div>
          <div className="list-details scrolls">
            {USERS.map((user) => (
              <div
                key={user.id}
                className={`list-details__items${selectedId === user.id ? " active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectUser(user.id)}
                onKeyDown={(e) => e.key === "Enter" && handleSelectUser(user.id)}
              >
                <div className="username-header">
                  <div className="username-header__user">
                    <div className="avt-img">
                      <img src={user.avatar} alt="" width={40} height={40} />
                    </div>
                    <div className="username-header__info flex-1">
                      <p className="name fw-500">{user.name}</p>
                      <span className="date">{user.date}</span>
                    </div>
                  </div>
                  <div className={`tag-label ${ROLE_CLASS[user.role]}`}>{user.role}</div>
                </div>
                <div className="username-tags">
                  {user.schedule && <div className="tag-label">{user.schedule}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="set-user-right wrapper-box-edit">
          <div className={`wrapper-box-edit__content form-default${detailLoading && !isAddingUser ? " user-detail-loading" : ""}`}>
            {isAddingUser ? (
              <NewUserForm onClose={() => setIsAddingUser(false)} onSave={() => {}} />
            ) : (
              <>
            {detailLoading && (
              <div className="user-detail-loading__overlay" aria-hidden>
                <div className="user-detail-loading__inner">
                  <img
                    src="/shared/grass icon.png"
                    alt=""
                    className="user-detail-loading__icon"
                    aria-hidden
                  />
                </div>
              </div>
            )}
            <div className="page-wrapper wrapbox-user p-0 border-none">
              <div className="wrapbox-user__frame">
                <div className="rows mb-5">
                  <div className="avatar">
                    <img className="avatar-img" src={selected.avatar} alt="" width={40} height={40} />
                  </div>
                  <button type="button" className="v2-btn-default has-icon js-edit-form">
                    <span className="material-symbols-outlined">edit</span>
                    <span>Edit</span>
                  </button>
                </div>
                <div className="rows">
                  <div className="rows__label">First Name</div>
                  <div className="rows__info">{selected.firstName || "—"}</div>
                </div>
                <div className="rows">
                  <div className="rows__label">Last Name</div>
                  <div className="rows__info">{selected.lastName || "—"}</div>
                </div>
                <div className="rows">
                  <div className="rows__label">Username</div>
                  <div className="rows__info">{selected.username || "—"}</div>
                </div>
                <div className="rows">
                  <div className="rows__label">License</div>
                  <div className="rows__info">{selected.license || "—"}</div>
                </div>
                <div className="rows">
                  <div className="rows__label">Email</div>
                  {selected.email ? (
                    <a className="rows__info --link" href={`mailto:${selected.email}`}>{selected.email}</a>
                  ) : (
                    <div className="rows__info">—</div>
                  )}
                </div>
              </div>
              <div className="wrapbox-user__frame wrap-sessions">
                <div className="wrap-sessions__header">
                  <h5 className="fs-14">Active Devices</h5>
                  <span className="dots fs-13">({ACTIVE_DEVICES.length} active devices)</span>
                </div>
                <div className="wrap-sessions__list">
                  {ACTIVE_DEVICES.map((d, i) => (
                    <div key={i} className="device-items">
                      <div className="device-items__icon flex-centeritem"><DeviceIcon /></div>
                      <div className="device-items__info flex-1">
                        <div className="word-break">{d.device}</div>
                        <div className="last-login">
                          <span className="word-break">{d.location}</span>
                          <span className="time">{d.time}</span>
                        </div>
                      </div>
                      <button type="button" className="btn-modal v2-btn-default has-icon">
                        <span className="material-symbols-outlined">logout</span>
                        Sign Out
                      </button>
                    </div>
                  ))}
                </div>
                <div className="wrap-sessions__link">
                  <button type="button" className="v2-btn-default --icon-r --purple svg-purple">
                    Session History
                    <SessionHistoryIcon />
                  </button>
                </div>
              </div>
              <div className="wrapbox-user__frame has-collapse">
                <div className="permissions-header">
                  <p className="title --sm">Super Admin Permissions</p>
                  <button
                    type="button"
                    className={`v2-btn-default --icon-sm border-none icon-collapse${permissionsOpen ? " is-open" : ""}`}
                    onClick={() => setPermissionsOpen((o) => !o)}
                    aria-expanded={permissionsOpen}
                  >
                    <ChevronDownIcon />
                  </button>
                </div>
                {permissionsOpen && (
                  <div className="permissions-content">
                    <div className="rows --lg">
                      <div className="rows__label">Tabs</div>
                      <div className="rows__info --has-tag">
                        <div className="tag-label">Customers</div>
                        <div className="tag-label">Reports</div>
                        <div className="tag-label">Settings</div>
                        <div className="tag-label">Account</div>
                        <div className="tag-label">Addons</div>
                      </div>
                    </div>
                    <div className="rows --lg">
                      <div className="rows__label">Access</div>
                      <div className="rows__info">
                        {["Export Customer List", "Edit or Delete Notes", "Edit or Delete Comments", "Edit or Delete Top Notes", "Edit or Delete Tasks", "Edit Check In / Out Time", "Sales Commission", "Manage Todo Templates", "Manage Note Templates", "Show Work Pool", "Search Customer Profiles", "Add Customers", "Edit Customers", "Add Jobs", "Edit Existing Jobs", "Delete Jobs", "Move All Recurring", "Stripe / Square Card", "Weather Card", "Invoice Card", "Edit or Delete Time Offs", "Edit or Delete Events", "INBOX: EMAIL INBOX", "Dashboard", "Jobs & Invoices Summary Banner", "Show Daily Invoice Summary"].map((item) => (
                          <p key={item} className="list-items">{item}</p>
                        ))}
                      </div>
                    </div>
                    <div className="rows">
                      <div className="rows__label">Notifications</div>
                      <div className="rows__info">
                        {["All Online Payments", "E-Signed Document", "E-Signed Estimate", "E-Signed Invoice", "Inbound Leads", "Job Confirmations", "Job Reschedules", "Reviews", "Subscription", "Online Booking"].map((item) => (
                          <p key={item} className="list-items">{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
