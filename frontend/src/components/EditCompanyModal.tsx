import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export type CompanyFormData = {
  logoUrl: string;
  name: string;
  email: string;
  phone: string;
  fax: string;
  website: string;
  country: string;
  addressStreet: string;
  city: string;
  state: string;
  zip: string;
  industry: string;
  businessLicense: string;
  operatingStart: string;
  operatingEnd: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  temperature: string;
  language: string;
  showHolidays: boolean;
};

type EditCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyFormData;
  onSave?: (data: CompanyFormData) => void;
};

const resetFormFromCompany = (company: CompanyFormData) => ({
  name: company.name,
  email: company.email,
  phone: company.phone,
  fax: company.fax,
  website: company.website,
  country: company.country,
  address: company.addressStreet,
  city: company.city,
  state: company.state,
  zip: company.zip,
  industry: company.industry,
  businessLicense: company.businessLicense,
  operatingStart: company.operatingStart,
  operatingEnd: company.operatingEnd,
  timezone: company.timezone,
  dateFormat: company.dateFormat,
  currency: company.currency,
  temperature: company.temperature,
  language: company.language,
  showHolidays: company.showHolidays,
});

export const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  isOpen,
  onClose,
  company,
  onSave,
}) => {
  const [form, setForm] = useState(resetFormFromCompany(company));

  useEffect(() => {
    if (isOpen) {
      setForm(resetFormFromCompany(company));
    }
  }, [isOpen, company]);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({
      ...company,
      name: form.name,
      email: form.email,
      phone: form.phone,
      fax: form.fax,
      website: form.website,
      country: form.country,
      addressStreet: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      industry: form.industry,
      businessLicense: form.businessLicense,
      operatingStart: form.operatingStart,
      operatingEnd: form.operatingEnd,
      timezone: form.timezone,
      dateFormat: form.dateFormat,
      currency: form.currency,
      temperature: form.temperature,
      language: form.language,
      showHolidays: form.showHolidays,
    });
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
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
        onClick={(e) => e.target === e.currentTarget && onClose()}
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
                onClick={onClose}
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="body-modal modal-edit-company__body scrolls">
              <div className="page-wrapper">
                <div className="rows --edit-logo has-divider flex-betweenitems">
                  <div className="logo flex-1">
                    <img src={company.logoUrl} alt="Logo Company" width={125} height={70} className="logo-img" />
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
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
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
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
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
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
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
                          value={form.fax}
                          onChange={(e) => setForm((p) => ({ ...p, fax: e.target.value }))}
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
                        value={form.website}
                        onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
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
                        value={form.country}
                        onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
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
                        value={form.address}
                        onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
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
                          value={form.city}
                          onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
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
                          value={form.state}
                          onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
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
                          value={form.zip}
                          onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))}
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
                          value={form.industry}
                          onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
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
                          value={form.businessLicense}
                          onChange={(e) => setForm((p) => ({ ...p, businessLicense: e.target.value }))}
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
                            value={form.operatingStart}
                            onChange={(e) => setForm((p) => ({ ...p, operatingStart: e.target.value }))}
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
                            value={form.operatingEnd}
                            onChange={(e) => setForm((p) => ({ ...p, operatingEnd: e.target.value }))}
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
                          value={form.timezone}
                          onChange={(e) => setForm((p) => ({ ...p, timezone: e.target.value }))}
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
                          value={form.dateFormat}
                          onChange={(e) => setForm((p) => ({ ...p, dateFormat: e.target.value }))}
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
                          value={form.currency}
                          onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value }))}
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
                          value={form.temperature}
                          onChange={(e) => setForm((p) => ({ ...p, temperature: e.target.value }))}
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
                        value={form.language}
                        onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="rows has-divider flexcenter gap-4">
                    <p className="flex-1">Display Holidays on Calendar</p>
                    <div className="switch large">
                      <span className={`switch__label cursor-pointer ${form.showHolidays ? "--active" : ""}`}>
                        {form.showHolidays ? "On" : "Off"}
                      </span>
                      <input
                        id="edit-show-holidays"
                        type="checkbox"
                        className="toggle toggle-round label-enabled"
                        checked={form.showHolidays}
                        onChange={(e) => setForm((p) => ({ ...p, showHolidays: e.target.checked }))}
                      />
                      <label htmlFor="edit-show-holidays" />
                    </div>
                  </div>
                  <div className="footer">
                    <button type="button" className="btn btn-cancel" onClick={onClose}>
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
  );

  return createPortal(modalContent, document.body);
};
