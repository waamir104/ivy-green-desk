import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const EditIcon = () => (
  <span className="material-symbols-outlined">edit</span>
);

const defaultCompany = {
  logoUrl: "https://d10lkxv225q7z2.cloudfront.net/large/logos%2Forigin%2F5bdd5dd269b11b993c1ba90ac87188daweb-WhatsApp_Image_2024-12-23_at_8.27.48_AM.jpeg",
  name: "IVY GREEN",
  email: "ivygreenlawncare@bellsouth.net",
  phone: "+1 (770) 487-3205",
  fax: "",
  website: "https://www.ivygreenlawncare.com/",
  country: "United States",
  address: ["205 Shamrock Industrial Blvd", "tyrone, GA 30290"],
  addressStreet: "205 Shamrock Industrial Blvd",
  city: "tyrone",
  state: "GA",
  zip: "30290",
  industry: "Lawn Care & Maintenance",
  businessLicense: "",
  operatingStart: "07:00 AM",
  operatingEnd: "06:00 PM",
  timezone: "(GMT-05:00) Eastern Time (US & Canada)",
  dateFormat: "MM/dd/yyyy [ 02/18/2026 ]",
  currency: "USD US Dollar ($)",
  temperature: "Fahrenheit (F)",
  showHolidays: true,
  language: "English",
};

export const SettingsCompanyPage = () => {
  const c = defaultCompany;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(c.name);
  const [editEmail, setEditEmail] = useState(c.email);
  const [editPhone, setEditPhone] = useState(c.phone);
  const [editFax, setEditFax] = useState(c.fax);
  const [editWebsite, setEditWebsite] = useState(c.website);
  const [editCountry, setEditCountry] = useState(c.country);
  const [editAddress, setEditAddress] = useState(c.addressStreet);
  const [editCity, setEditCity] = useState(c.city);
  const [editState, setEditState] = useState(c.state);
  const [editZip, setEditZip] = useState(c.zip);
  const [editIndustry, setEditIndustry] = useState(c.industry);
  const [editBusinessLicense, setEditBusinessLicense] = useState(c.businessLicense);
  const [editOperatingStart, setEditOperatingStart] = useState(c.operatingStart);
  const [editOperatingEnd, setEditOperatingEnd] = useState(c.operatingEnd);
  const [editTimezone, setEditTimezone] = useState(c.timezone);
  const [editDateFormat, setEditDateFormat] = useState(c.dateFormat);
  const [editCurrency, setEditCurrency] = useState(c.currency);
  const [editTemperature, setEditTemperature] = useState(c.temperature);
  const [editLanguage, setEditLanguage] = useState(c.language);
  const [editShowHolidays, setEditShowHolidays] = useState(c.showHolidays);

  const openEditModal = () => {
    setEditName(c.name);
    setEditEmail(c.email);
    setEditPhone(c.phone);
    setEditFax(c.fax);
    setEditWebsite(c.website);
    setEditCountry(c.country);
    setEditAddress(c.addressStreet);
    setEditCity(c.city);
    setEditState(c.state);
    setEditZip(c.zip);
    setEditIndustry(c.industry);
    setEditBusinessLicense(c.businessLicense);
    setEditOperatingStart(c.operatingStart);
    setEditOperatingEnd(c.operatingEnd);
    setEditTimezone(c.timezone);
    setEditDateFormat(c.dateFormat);
    setEditCurrency(c.currency);
    setEditTemperature(c.temperature);
    setEditLanguage(c.language);
    setEditShowHolidays(c.showHolidays);
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    closeEditModal();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEditModal();
    };
    if (editModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [editModalOpen]);

  const editCompanyModalContent = editModalOpen ? (
    <div className="ReactModalPortal ReactModalPortal-edit-company" aria-modal="true" role="dialog">
      <div
        className="ReactModal__Overlay"
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
        onClick={(e) => e.target === e.currentTarget && closeEditModal()}
      >
        <div
          className="modal container-modal modal-edit-company open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal__container">
            <div className="header-modal">
              <h3 className="header-modal__label">Edit Company</h3>
              <button
                type="button"
                className="v2-btn-default --icon-lg --transparent"
                onClick={closeEditModal}
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="body-modal modal-edit-company__body scrolls">
              <div className="page-wrapper">
                <div className="rows --edit-logo has-divider flex-betweenitems">
                  <div className="logo flex-1">
                    <img src={c.logoUrl} alt="Logo Company" width={125} height={70} className="logo-img" />
                  </div>
                  <div className="upload-img ml-2">
                    <label className="v2-btn-default">
                      Upload new Logo
                      <input type="file" className="dp-hide" accept="image/png, image/jpeg, image/jpg" />
                    </label>
                  </div>
                  <div className="v2-btn-default has-bg-red ml-2" tabIndex={0} role="button">
                    <span>Delete Logo</span>
                  </div>
                </div>
                <form onSubmit={handleSave} className="modal-edit-company__form">
                  <div className="rows">
                    <span className="rows__label">Company Name</span>
                    <div className="rows__info">
                      <input
                        className="field-input"
                        placeholder="Company Name"
                        type="text"
                        name="name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <span className="rows__label">Company Email</span>
                    <div className="rows__info">
                      <input
                        className="field-input"
                        placeholder="Company Email"
                        type="text"
                        name="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row-haft">
                    <div className="col-lg rows">
                      <span className="rows__label">Phone</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          placeholder="Phone"
                          type="text"
                          name="phone"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg rows mt-0">
                      <span className="rows__label">Fax</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          placeholder="Fax"
                          type="text"
                          name="fax"
                          value={editFax}
                          onChange={(e) => setEditFax(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rows has-divider">
                    <span className="rows__label">Website</span>
                    <div className="rows__info">
                      <input
                        className="field-input"
                        placeholder="Website"
                        type="text"
                        name="website"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <span className="rows__label">Country</span>
                    <div className="rows__info">
                      <input
                        className="field-input"
                        placeholder="Country"
                        type="text"
                        name="country"
                        value={editCountry}
                        onChange={(e) => setEditCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <span className="rows__label">Address</span>
                    <div className="rows__info">
                      <input
                        className="field-input"
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row-haft has-divider">
                    <div className="col-md rows">
                      <span className="rows__label">City</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          placeholder="City"
                          type="text"
                          name="city"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md rows mt-0">
                      <span className="rows__label">State</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          placeholder="State"
                          type="text"
                          name="state"
                          value={editState}
                          onChange={(e) => setEditState(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm rows mt-0">
                      <span className="rows__label">Zip</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          placeholder="Zip"
                          type="text"
                          name="zip"
                          value={editZip}
                          onChange={(e) => setEditZip(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-haft has-divider">
                    <div className="col-lg rows">
                      <span className="rows__label">Industry</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          placeholder="Industry"
                          type="text"
                          name="industry"
                          value={editIndustry}
                          onChange={(e) => setEditIndustry(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg rows mt-0">
                      <span className="rows__label">Business License</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          placeholder="Business License"
                          type="text"
                          name="license"
                          value={editBusinessLicense}
                          onChange={(e) => setEditBusinessLicense(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rows --operating has-divider">
                    <span className="rows__label">Operating Hours</span>
                    <div className="row-haft operating-hours-range">
                      <div className="col-lg rows">
                        <span className="rows__label">From</span>
                        <div className="rows__info">
                          <input
                            className="field-input"
                            type="text"
                            name="operating_start"
                            value={editOperatingStart}
                            onChange={(e) => setEditOperatingStart(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg rows mt-0">
                        <span className="rows__label">To</span>
                        <div className="rows__info">
                          <input
                            className="field-input"
                            type="text"
                            name="operating_end"
                            value={editOperatingEnd}
                            onChange={(e) => setEditOperatingEnd(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row-haft">
                    <div className="col-lg rows">
                      <span className="rows__label">Timezone</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          type="text"
                          name="timezone"
                          value={editTimezone}
                          onChange={(e) => setEditTimezone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg rows mt-0">
                      <span className="rows__label">Date Format</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          type="text"
                          name="date_format"
                          value={editDateFormat}
                          onChange={(e) => setEditDateFormat(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-haft">
                    <div className="col-lg rows">
                      <span className="rows__label">Currency</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          type="text"
                          name="currency"
                          value={editCurrency}
                          onChange={(e) => setEditCurrency(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg rows mt-0">
                      <span className="rows__label">Temperature</span>
                      <div className="rows__info">
                        <input
                          className="field-input"
                          type="text"
                          name="temperature"
                          value={editTemperature}
                          onChange={(e) => setEditTemperature(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rows has-divider">
                    <span className="rows__label">Language</span>
                    <div className="rows__info">
                      <input
                        className="field-input"
                        type="text"
                        name="language"
                        value={editLanguage}
                        onChange={(e) => setEditLanguage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="rows has-divider flexcenter gap-4">
                    <p className="flex-1">Display Holidays on Calendar</p>
                    <div className="switch large">
                      <span className={`switch__label cursor-pointer ${editShowHolidays ? "--active" : ""}`}>
                        {editShowHolidays ? "On" : "Off"}
                      </span>
                      <input
                        id="edit-show-holidays"
                        type="checkbox"
                        className="toggle toggle-round label-enabled"
                        checked={editShowHolidays}
                        onChange={(e) => setEditShowHolidays(e.target.checked)}
                      />
                      <label htmlFor="edit-show-holidays" />
                    </div>
                  </div>
                  <div className="footer">
                    <button type="button" className="btn btn-cancel" onClick={closeEditModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-save">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    <form className="contents-pages container-column wrapper-box-edit scrolls">
      <div className="box-tips hide">
        <div className="box-tips__content">
          <div className="tip">
            <div className="title">
              <span className="fw-600 fs-15">undefined</span>
              <div className="cursor-pointer pl-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="description fs-14">undefined</div>
          </div>
        </div>
      </div>
      <div className="wrapper-box-edit__content form-default">
        <div className="page-wrapper bg-white">
          <div className="rows mb-5">
            <div className="logo">
              <img className="logo-img" src={c.logoUrl} alt="" width={125} height={100} />
            </div>
            <div
              className="v2-btn-default has-icon js-edit-form"
              tabIndex={0}
              role="button"
              onClick={openEditModal}
              onKeyDown={(e) => e.key === "Enter" && openEditModal()}
            >
              <EditIcon />
              <span>Edit</span>
            </div>
          </div>
          <div className="rows">
            <div className="rows__label">Name</div>
            <div className="rows__info">{c.name}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Email</div>
            <div className="rows__info --link">{c.email}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Phone</div>
            <div className="rows__info">{c.phone}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Fax</div>
            <div className="rows__info">{c.fax}</div>
          </div>
          <div className="rows has-divider">
            <div className="rows__label">Website</div>
            <a href={c.website} className="rows__info --link" rel="noreferrer" target="_blank">
              {c.website}
            </a>
          </div>
          <div className="rows">
            <div className="rows__label">Country</div>
            <div className="rows__info">{c.country}</div>
          </div>
          <div className="rows has-divider">
            <div className="rows__label">Address</div>
            <div className="rows__info">
              {c.address.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <div className="rows">
            <div className="rows__label">Industry</div>
            <div className="rows__info">{c.industry}</div>
          </div>
          <div className="rows has-divider">
            <div className="rows__label">Business License</div>
            <div className="rows__info">{c.businessLicense}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Operating Hours</div>
            <div className="rows__info">{c.operatingHours}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Timezone</div>
            <div className="rows__info">{c.timezone}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Date Format</div>
            <div className="rows__info">{c.dateFormat}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Currency</div>
            <div className="rows__info">{c.currency}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Temperature</div>
            <div className="rows__info">{c.temperature}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Show Holidays</div>
            <div className="rows__info">{c.showHolidays}</div>
          </div>
          <div className="rows">
            <div className="rows__label">Language</div>
            <div className="rows__info">{c.language}</div>
          </div>
        </div>
      </div>
    </form>
    {editCompanyModalContent != null && createPortal(editCompanyModalContent, document.body)}
    </>
  );
};
