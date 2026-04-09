import React, { useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.287 4.30252C14.9965 3.68271 15.9764 3.46038 16.8905 3.72147C18.5291 4.18978 19.8098 5.47059 20.2782 7.10916L20.3241 7.29276C20.5212 8.21402 20.2404 9.17817 19.5682 9.85037L12.5135 16.906C11.8425 17.5771 11.0366 18.0957 10.1512 18.4285L9.76644 18.5594L5.59359 19.8435C4.71136 20.1148 3.88476 19.2883 4.15609 18.406L5.44027 14.2332L5.57113 13.8484C5.90397 12.9631 6.4226 12.1571 7.09359 11.4861L14.1493 4.43143L14.287 4.30252Z" fill="rgba(var(--utility-color), 1)" />
  </svg>
);

const PortalIcon = () => (
  <span className="material-symbols-outlined">account_circle</span>
);

const StatementIcon = () => (
  <span className="material-symbols-outlined">account_balance_wallet</span>
);

const PlusIcon = () => (
  <span className="material-symbols-outlined">add_2</span>
);

const tabStripLinkStyle: React.CSSProperties = {
  height: 28,
  padding: "0 12px",
  fontSize: 14,
  borderRadius: 5,
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
};

const tabNavClass = ({ isActive }: { isActive: boolean }) =>
  `tab-items customer-detail-tab-item${isActive ? " active-tab-selector" : ""}`;

function normalizePathname(pathname: string): string {
  return pathname.replace(/\/$/, "") || pathname;
}

/** Notes tab: exact `/app/customers/:id` only (no account/jobs/… segment). */
function isCustomerNotesRoute(pathname: string, customerId: string): boolean {
  return normalizePathname(pathname) === `/app/customers/${customerId}`;
}

type JobsStatusFilter = "all" | "active" | "completed" | "canceled";

function JobsStatusTabStrip({
  variant,
  jobsStatusFilter,
  onStatusChange,
}: {
  variant: "compact" | "fullWidth";
  jobsStatusFilter: JobsStatusFilter;
  onStatusChange: (v: JobsStatusFilter) => void;
}) {
  const isFull = variant === "fullWidth";
  return (
    <div
      className={`btn-item ml-0 relative no-effect customer-detail-tab-slide-group customer-detail-jobs-tabs${isFull ? " customer-detail-jobs-tabs-equal" : " customer-detail-jobs-tabs-compact"}`}
      style={{
        height: 30,
        padding: 1,
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.14)",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        gap: 0,
        marginLeft: isFull ? 0 : 12,
        width: isFull ? "100%" : "fit-content",
        flexShrink: isFull ? undefined : 0,
        flex: isFull ? 1 : undefined,
        minWidth: isFull ? 0 : undefined,
        boxSizing: "border-box",
      }}
    >
      <div className="slide-tab" aria-hidden />
      <button
        type="button"
        className={`tab-items customer-detail-tab-item${jobsStatusFilter === "all" ? " active-tab-selector" : ""}`}
        style={tabStripLinkStyle}
        onClick={() => onStatusChange("all")}
      >
        All
      </button>
      <button
        type="button"
        className={`tab-items customer-detail-tab-item${jobsStatusFilter === "active" ? " active-tab-selector" : ""}`}
        style={tabStripLinkStyle}
        onClick={() => onStatusChange("active")}
      >
        Active
      </button>
      <button
        type="button"
        className={`tab-items customer-detail-tab-item${jobsStatusFilter === "completed" ? " active-tab-selector" : ""}`}
        style={tabStripLinkStyle}
        onClick={() => onStatusChange("completed")}
      >
        Completed
      </button>
      <button
        type="button"
        className={`tab-items customer-detail-tab-item${jobsStatusFilter === "canceled" ? " active-tab-selector" : ""}`}
        style={tabStripLinkStyle}
        onClick={() => onStatusChange("canceled")}
      >
        Canceled
      </button>
    </div>
  );
}

function getCustomerDetailPanelLabel(pathname: string, id: string): string {
  const n = normalizePathname(pathname);
  const labels: Record<string, string> = {
    [`/app/customers/${id}`]: "Notes",
    [`/app/customers/account/${id}`]: "Account",
    [`/app/customers/contacts/${id}`]: "Contacts",
    [`/app/customers/locations/${id}`]: "Locations",
    [`/app/customers/jobs/${id}`]: "Jobs",
    [`/app/customers/invoices/${id}`]: "Invoices",
    [`/app/customers/estimates/${id}`]: "Estimates",
    [`/app/customers/payments/${id}`]: "Payments",
    [`/app/customers/credits/${id}`]: "Credits",
    [`/app/customers/documents/${id}`]: "Documents",
  };
  return labels[n] ?? "Notes";
}

export const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const base = `/app/customers`;
  const [showContacts, setShowContacts] = useState(false);
  const [jobsStatusFilter, setJobsStatusFilter] = useState<JobsStatusFilter>("all");

  const panelLabel = useMemo(
    () => getCustomerDetailPanelLabel(location.pathname, id ?? ""),
    [location.pathname, id],
  );

  const isNotesRouteActive = useMemo(
    () => isCustomerNotesRoute(location.pathname, id ?? ""),
    [location.pathname, id],
  );

  return (
    <div id="customer_detail_layout" style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            backgroundColor: "transparent",
            height: 72,
            padding: "20px 16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            aria-label="Back to customers"
            onClick={() => navigate("/app/customers")}
            style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              marginRight: 15,
              border: "1px solid rgba(0, 0, 0, 0.14)",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ width: 24, height: 24, fontSize: 24, lineHeight: "24px" }}
            >
              arrow_back
            </span>
          </button>
          <div
            className="btn-item ml-0 relative"
            style={{
              height: 30,
              padding: 1,
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.14)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 0,
            }}
          >
            <NavLink to={`${base}/account/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Account
            </NavLink>
            <NavLink to={`${base}/contacts/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Contacts
            </NavLink>
            <NavLink to={`${base}/locations/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Locations
            </NavLink>
          </div>
          <div
            className="btn-item ml-0 relative no-effect customer-detail-tab-slide-group"
            style={{
              height: 30,
              padding: 1,
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.14)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 0,
              marginLeft: 12,
            }}
          >
            <div className="slide-tab" aria-hidden />
            <NavLink
              end
              to={`${base}/${id}`}
              className={() => tabNavClass({ isActive: isNotesRouteActive })}
              style={tabStripLinkStyle}
            >
              Notes
            </NavLink>
            <NavLink to={`${base}/jobs/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Jobs
            </NavLink>
            <NavLink to={`${base}/invoices/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Invoices
            </NavLink>
            <NavLink to={`${base}/estimates/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Estimates
            </NavLink>
            <NavLink to={`${base}/payments/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Payments
            </NavLink>
            <NavLink to={`${base}/credits/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Credits
            </NavLink>
            <NavLink to={`${base}/documents/${id}`} className={tabNavClass} style={tabStripLinkStyle}>
              Documents
            </NavLink>
          </div>
        </div>
        <div
          style={{
            flex: "1 1 0%",
            minHeight: 0,
            width: "100%",
            alignSelf: "stretch",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
          }}
        >
          {panelLabel === "Jobs" ? (
            <div
              className="customer-detail-jobs-panel"
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(0, 0, 0, 0.14)",
              }}
            >
              <div
                className="customer-detail-jobs-top"
                style={{
                  width: "100%",
                  minHeight: 48,
                  height: "auto",
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 0,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    boxSizing: "border-box",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 115,
                      height: 32,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 27,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        style={{
                          width: 16,
                          height: 16,
                          margin: 0,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 14, lineHeight: "20px" }}>0/1</span>
                  </div>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    style={{
                      height: 30,
                      borderRadius: 4,
                      border: "1px solid rgba(0, 0, 0, 0.14)",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px 8px 4px 4px",
                      cursor: "not-allowed",
                      opacity: 0.5,
                      color: "rgba(0, 0, 0, 0.14)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{
                        width: 13,
                        height: 13,
                        fontSize: 13,
                        lineHeight: "13px",
                        marginRight: 4,
                        color: "rgba(0, 0, 0, 0.14)",
                      }}
                    >
                      delete
                    </span>
                    <span style={{ color: "rgba(0, 0, 0, 0.14)" }}>Delete</span>
                  </button>
                  <JobsStatusTabStrip
                    variant="compact"
                    jobsStatusFilter={jobsStatusFilter}
                    onStatusChange={setJobsStatusFilter}
                  />
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      minHeight: 32,
                      alignSelf: "stretch",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 8,
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="search-form relative" style={{ position: "relative" }}>
                      <span
                        className="svg-search-absolute"
                        style={{
                          position: "absolute",
                          left: 15,
                          top: "50%",
                          transform: "translateY(-50%)",
                          opacity: 0.6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16, width: 16, height: 16, lineHeight: "16px" }}>search</span>
                      </span>
                      <input
                        className="search-ip"
                        type="text"
                        name="term"
                        placeholder="Search ..."
                        autoComplete="off"
                      />
                    </div>
                    <button
                      type="button"
                      className="customer-detail-jobs-new-job-btn"
                      style={{
                        padding: "6px 14px",
                        borderRadius: 4,
                        border: "none",
                        backgroundColor: "var(--primary-btn-bg)",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 500,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      New Job
                    </button>
                  </div>
                </div>
                <div
                  className="customer-detail-jobs-top-pink-strip"
                  style={{
                    width: "100%",
                    minHeight: 32,
                    height: 32,
                    marginTop: 8,
                    backgroundColor: "transparent",
                    boxSizing: "border-box",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "stretch",
                  }}
                >
                  <JobsStatusTabStrip
                    variant="fullWidth"
                    jobsStatusFilter={jobsStatusFilter}
                    onStatusChange={setJobsStatusFilter}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  backgroundColor: "red",
                }}
              />
              <div
                style={{
                  width: "100%",
                  minHeight: 64,
                  height: 64,
                  padding: "16px 16px",
                  backgroundColor: "blue",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ) : (
            <span>Esta es la ventana para {panelLabel}</span>
          )}
        </div>
      </div>
      <div
        style={{
          backgroundColor: "transparent",
          flex: 1,
          maxWidth: "295px",
          display: "flex",
          flexDirection: "column",
          marginTop: 6,
          marginRight: 16,
        }}
      >
        <div>
          <div
            className="details-info flexcenter flex-wrap gap-8"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.14)",
              borderRadius: 4,
              backgroundColor: "#ffffff",
            }}
          >
            <div className="flex-1 word-break">
              <b className="fs-16">Abdulla Amyn</b>
              <p className="flexcenter gap-4">
                <span className="grey-generic">Account</span>
                <span className="black-2">#5378</span>
              </p>
            </div>
            <Link to={`${base}/account/${id}`} className="v2-btn-default --icon-lg">
              <span className="material-symbols-outlined">edit</span>
            </Link>
            <div className="details-info__statement d-flex gap-4 w-100">
              <Link to={`${base}/portal/${id}`} className="v2-btn-default has-icon btn-bg-purple svg-purple --sm fs-13 btn-sidebar">
                <PortalIcon />
                <span className="flex-1 txt-ellipsis">Portal Access</span>
              </Link>
              <Link to={`${base}/statements/${id}`} className="v2-btn-default has-icon btn-bg-purple svg-purple --sm fs-13 btn-sidebar">
                <StatementIcon />
                <span className="flex-1 txt-ellipsis">Statement</span>
              </Link>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
              <div className="v2-dropdown tags list-add-tags">
                <div className="tags__label flex-betweenitems">
                  <div className="title-sx flexcenter gap-4">
                    Tags
                    <span className="v2-btn-default --icon-sm btn-edit-tag">
                      <PlusIcon />
                    </span>
                  </div>
                </div>
              </div>
              <div className="price">
                <div className="flex-betweenitems">
                  <span className="price-label">Balance</span>
                  <b className="cost fs-16 black-eerie-dark" title="$0.00">$0.00</b>
                </div>
                <div className="flex-betweenitems mt-1">
                  <span className="price-label">Credits</span>
                  <b className="cost fs-16 green-default" title="$0.00">$0.00</b>
                </div>
                <div className="flex-betweenitems mt-1">
                  <span className="price-label green-default flex-1">Deposits</span>
                  <b className="cost fs-16 green-default" title="$0.00">$0.00</b>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`details-info details-info--contacts flexcenter gap-8${showContacts ? " is-open" : ""}`}
            onClick={() => setShowContacts((prev) => !prev)}
            id="contactsToggle"
            role="button"
            aria-expanded={showContacts}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowContacts((prev) => !prev);
              }
            }}
          >
            <span>Contacts</span>
            <span className="material-symbols-outlined arrow">expand_more</span>
          </div>
          <div className="contacts-content" id="contactsContent">
            <div className="contact-item">
              <div className="contact-name">
                Aaron Rathburn
                <span className="badge">Primary</span>
              </div>
              <div className="contact-phone">
                <a href="tel:+16786447678">(678) 644-7678</a> <span className="muted">Mobile</span>
              </div>
              <div className="contact-email">
                vwabr337@yahoo.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
