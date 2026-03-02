import { Link, NavLink, useParams, useLocation } from "react-router-dom";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711L7.413 11H20C20.5523 11 21 11.4477 21 12C21 12.5128 20.614 12.9355 20.1166 12.9933L20 13H7.415L11.7071 17.2929C12.0676 17.6534 12.0953 18.2206 11.7903 18.6129L11.7071 18.7071C11.3166 19.0976 10.6834 19.0976 10.2929 18.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L10.2929 5.29289Z" fill="var(--color-icon)" />
  </svg>
);

const MoveSidebarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.5406 8.5412C14.7943 8.28723 15.2059 8.28702 15.4598 8.54073C15.7138 8.79444 15.714 9.206 15.4603 9.45997L13.5716 11.3506H19.5003C19.8593 11.3506 20.1503 11.6416 20.1503 12.0006C20.1503 12.3596 19.8593 12.6506 19.5003 12.6506H13.5679L15.4598 14.5408C15.7137 14.7945 15.7139 15.206 15.4602 15.46C15.2064 15.714 14.7949 15.7141 14.5409 15.4604L11.5412 12.4633C11.2872 12.2096 11.287 11.7981 11.5407 11.5441L14.5406 8.5412Z" fill="var(--color-icon)" />
    <rect x="5" y="5" width="4" height="14" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const CollapseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 5.5L19 12L12.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 5.5L13 12L6.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.287 4.30252C14.9965 3.68271 15.9764 3.46038 16.8905 3.72147C18.5291 4.18978 19.8098 5.47059 20.2782 7.10916L20.3241 7.29276C20.5212 8.21402 20.2404 9.17817 19.5682 9.85037L12.5135 16.906C11.8425 17.5771 11.0366 18.0957 10.1512 18.4285L9.76644 18.5594L5.59359 19.8435C4.71136 20.1148 3.88476 19.2883 4.15609 18.406L5.44027 14.2332L5.57113 13.8484C5.90397 12.9631 6.4226 12.1571 7.09359 11.4861L14.1493 4.43143L14.287 4.30252Z" fill="currentColor" />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6Z" fill="var(--color-icon)" />
  </svg>
);

const TooltipSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="8" fill="#7A83A6" />
    <g>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11ZM7.9998 3.25281C9.68874 3.25281 10.75 3.98978 10.75 5.99999C10.75 7.08162 10.3335 7.57488 9.39526 8.09934L9.36601 8.1157C8.83795 8.41104 8.7498 8.51866 8.7498 8.99999C8.7498 9.41421 8.41402 9.74999 7.9998 9.74999C7.58559 9.74999 7.2498 9.41421 7.2498 8.99999C7.2498 7.86609 7.68129 7.33929 8.6338 6.80655L8.66334 6.79003C9.17748 6.50262 9.25 6.41675 9.25 5.99999C9.25 4.95947 8.95241 4.75281 7.9998 4.75281C7.27298 4.75281 6.75 5.17814 6.75 5.99999C6.75 6.41421 6.41421 6.74999 6 6.74999C5.58579 6.74999 5.25 6.41421 5.25 5.99999C5.25 4.27345 6.50497 3.25281 7.9998 3.25281Z" fill="white" />
    </g>
  </svg>
);

const PortalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12 13.5C13.3807 13.5 14.5 11.933 14.5 10C14.5 8.067 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.067 9.5 10C9.5 11.933 10.6193 13.5 12 13.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StatementIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="var(--color-icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M4.5 9.127V7.5a2 2 0 012-2h9a2 2 0 012 2v1" />
    <path fillRule="evenodd" stroke="var(--color-icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M4.5 7.5v0a1 1 0 001 1h12a2 2 0 012 2v6a2 2 0 01-2 2h-11a2 2 0 01-2-2v-9z" clipRule="evenodd" />
    <path stroke="var(--color-icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M15.5 14.5a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 13.5L12 10L15.5 13.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const base = `/app/customers`;
  const accountUrl = `${base}/account/${id}`;
  const isAccountActive = location.pathname === accountUrl || location.pathname === `${base}/${id}`;
  const contactsUrl = `${base}/contacts/${id}`;
  const locationsUrl = `${base}/locations/${id}`;
  const notesUrl = `${base}/${id}`;
  const jobsUrl = `${base}/jobs/${id}`;
  const invoicesUrl = `${base}/invoices/${id}`;
  const estimatesUrl = `${base}/estimates/${id}`;
  const paymentsUrl = `${base}/payments/${id}`;
  const creditsUrl = `${base}/credits/${id}`;
  const documentsUrl = `${base}/documents/${id}`;

  return (
    <div id="customer_detail_layout" className="container-wrap custom-grid-customer">
      <div className="wrap-menu flexcenter relative">
        <div className="btn-switch flex-column gap-4">
          <div className="v2-btn-default --icon-sm tooltip btn-move-sidebar" title="Left">
            <MoveSidebarIcon />
            <span className="tooltiptext left --collapse">Left</span>
            <span className="tooltiptext left --expand">Right</span>
          </div>
          <div className="v2-btn-default --icon-sm tooltip btn-collapse" title="Collapse">
            <CollapseIcon />
            <span className="tooltiptext left --collapse">Collapse</span>
            <span className="tooltiptext left --expand">Expand</span>
          </div>
        </div>
        <Link to={base} className="v2-btn-default --icon-lg flex-auto mr-3" aria-label="Back to customers">
          <BackIcon />
        </Link>
        <div className="tabs">
          <div className="btn-item ml-0 relative">
            <div className="slide-tab" style={{ width: 80, transform: "translateX(1px)" }} />
            <NavLink to={accountUrl} className={`tab-items${isAccountActive ? " active-tab-selector" : ""}`}>
              Account
            </NavLink>
            <NavLink to={contactsUrl} className="tab-items">Contacts</NavLink>
            <NavLink to={locationsUrl} className="tab-items">Locations</NavLink>
          </div>
          <div className="is-divider" />
          <div className="btn-item ml-0 relative">
            <NavLink to={notesUrl} className="tab-items">Notes</NavLink>
            <NavLink to={jobsUrl} className="tab-items">Jobs</NavLink>
            <NavLink to={invoicesUrl} className="tab-items">Invoices</NavLink>
            <NavLink to={estimatesUrl} className="tab-items">Estimates</NavLink>
            <NavLink to={paymentsUrl} className="tab-items">Payments</NavLink>
            <NavLink to={creditsUrl} className="tab-items">Credits</NavLink>
            <NavLink to={documentsUrl} className="tab-items">Documents</NavLink>
          </div>
        </div>
      </div>

      <div className="wrapper-columns wrapper-profile scrolls">
        <div className="contents-pages wrapper-box-edit">
          <div className="wrapper-box-edit__inner">
            <div className="page-wrapper flex-auto form-account">
              <div className="head-main flex-betweenitems mb-2">
                <h3 className="title-font15">Account</h3>
                <div className="v2-btn-default has-icon js-edit-customer">
                  <EditIcon />
                  Edit
                </div>
              </div>
              <div className="form-default">
                <div className="rows align-center">
                  <div className="rows__label">
                    Account #
                    <span className="tooltip ml-1">
                      <TooltipSvg />
                      <span className="tooltiptext top ml-3">This field can contain numbers, letters and dashes but must end in a number</span>
                    </span>
                  </div>
                  <div className="rows__info">7099</div>
                </div>
                <div className="rows align-center mt-0">
                  <div className="rows__label">Status</div>
                  <div className="rows__info">
                    <div className="status-btn --sm active">Active</div>
                  </div>
                </div>
                <div className="rows align-center mt-0">
                  <div className="rows__label">First Name</div>
                  <div className="rows__info">ZIMMERMAN</div>
                </div>
                <div className="rows align-center mt-0">
                  <div className="rows__label">Last Name</div>
                  <div className="rows__info">RAMONA</div>
                </div>
                <div className="rows align-center mt-0">
                  <div className="rows__label">Email</div>
                  <div className="rows__info --link">
                    <a href="mailto:zimmfamily55@gmail.com">zimmfamily55@gmail.com</a>
                  </div>
                </div>
                <div className="rows mt-0">
                  <div className="rows__label">Phone</div>
                  <div className="rows__info">
                    <div className="valid-phone tooltip">
                      <div className="valid-phone__number active">
                        <div className="cursor-pointer tooltip">
                          <p className="txt-ellipsis txt-phone-number">(770) 712-5634</p>
                        </div>
                      </div>
                      <div className="valid-phone__btn" title="Mobile">
                        <span className="phone-type">Mobile</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rows mt-0">
                  <div className="rows__label">Tags</div>
                  <div className="rows__info flex-1">
                    <div className="wrap-existing-tag flexcenter flex-wrap">
                      <span className="v2-btn-default --icon-sm btn-edit-tag">
                        <PlusIcon />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rows mt-1 rows-balance align-center">
                  <span className="tooltip">
                    <TooltipSvg />
                    <span className="tooltiptext top">By default invoices show a total account balance across all locations. Use this feature to hide the total account balance.</span>
                  </span>
                  <span className="rows-balance__label flex-1">Hide the total account balance on invoices</span>
                  <div className="switch large" title="No">
                    <span className="switch__label cursor-pointer">No</span>
                    <input id="hidden_balance" className="toggle toggle-round" type="checkbox" />
                    <label htmlFor="hidden_balance" />
                  </div>
                </div>
              </div>
            </div>

            <div className="page-wrapper flex-auto form-method form-inner">
              <div className="head-main flex-betweenitems">
                <div className="title-font15">Payment Method</div>
              </div>
            </div>

            <div className="page-wrapper flex-auto form-contact form-inner">
              <div className="head-main flex-betweenitems">
                <h3 className="title-font15">Additional Contacts</h3>
                <div className="v2-btn-main --bg-green --icon-lg svg-white btn-modal">
                  <PlusIcon />
                </div>
              </div>
            </div>

            <div className="page-wrapper flex-auto form-location form-inner">
              <div className="head-main flex-betweenitems">
                <h3 className="title-font15">Locations</h3>
                <div className="v2-btn-main --bg-green --icon-lg svg-white btn-modal">
                  <PlusIcon />
                </div>
              </div>
              <div className="rows mt-0">
                <div className="contact-name w-100 dp-block">
                  <span className="contact-name__label fw-600 purple-default mr-1">321 Legacy Lane (Kimmeridge)</span>
                  <span className="contact-name__label granite-gray">321 Legacy Lane (Kimmeridge), Peachtree City, GA, 30269</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-details">
          <div className="scrolls">
            <div className="details-info flexcenter flex-wrap gap-8">
              <div className="flex-1 word-break">
                <b className="fs-16">ZIMMERMAN RAMONA</b>
                <p className="flexcenter gap-4">
                  <span className="grey-generic">Account</span>
                  <span className="black-2">#7099</span>
                </p>
              </div>
              <Link to={accountUrl} className="v2-btn-default --icon-lg" aria-current="page">
                <EditIcon />
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
            </div>
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
          <div className="sidebar-details__content">
            <div className="details-info wrap-item wrap-collapse is-open">
              <div className="v2-btn-default --transparent --icon-lg">
                <PlusIcon />
              </div>
              <div className="wrap-item__header flex-betweenitems">
                <p className="txt-ellipsis flex-1">Tasks</p>
                <div className="arrow">
                  <ArrowDownIcon />
                </div>
              </div>
            </div>
            <div className="details-info wrap-item wrap-collapse is-open">
              <div className="wrap-item__header">
                <p className="txt-ellipsis flex-1">Contacts</p>
                <div className="arrow">
                  <ArrowDownIcon />
                </div>
              </div>
              <div className="wrap-collapse__details flex-column gap-6">
                <div className="valid-name">
                  <p className="valid-name__title">ZIMMERMAN RAMONA</p>
                  <div className="label-content --primary">Primary</div>
                </div>
                <div className="valid-phone tooltip">
                  <div className="valid-phone__number active">
                    <div className="cursor-pointer tooltip">
                      <p className="txt-ellipsis txt-phone-number">(770) 712-5634</p>
                    </div>
                  </div>
                  <div className="valid-phone__btn" title="Mobile">
                    <span className="phone-type">Mobile</span>
                  </div>
                </div>
                <a href="mailto:zimmfamily55@gmail.com" className="is-link">zimmfamily55@gmail.com</a>
                <div className="details-info flex-column gap-8" />
              </div>
            </div>
            <div className="wrap-locations">
              <div className="details-info wrap-location wrap-collapse is-open">
                <div className="wrap-item__header flex-betweenitems">
                  <p className="txt-ellipsis flex-1">321 Legacy Lane (Kimmeridge)</p>
                  <div className="arrow">
                    <ArrowDownIcon />
                  </div>
                </div>
                <div className="wrap-collapse__details flex-column gap-10">
                  <div className="address word-break flex-column gap-6">
                    <h4 className="title-sx">Service Address</h4>
                    <p className="address__info open_location purple-default cursor-pointer">
                      321 Legacy Lane (Kimmeridge)
                      <br />
                      Peachtree City, GA 30269
                    </p>
                  </div>
                  <div className="v2-dropdown tags list-add-tags">
                    <div className="tags__label flex-betweenitems">
                      <div className="title flexcenter fs-14 fw-500">
                        Location tags
                        <span className="v2-btn-default --icon-sm btn-edit-tag">
                          <PlusIcon />
                        </span>
                      </div>
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
