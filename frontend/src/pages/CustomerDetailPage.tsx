import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

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

export const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const base = `/app/customers`;
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div id="customer_detail_layout" style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ backgroundColor: "blue", flex: 1 }} />
        <div style={{ backgroundColor: "red", flex: 1 }} />
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
            className={`details-info details-info--contacts${showContacts ? " is-open" : ""}`}
            onClick={() => setShowContacts((prev) => !prev)}
          >
            <span className="contacts-label">Contacts</span>
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </div>
          {showContacts && (
            <div className="contacts-details wrap-collapse__details flex-column gap-6">
              <div className="valid-name">
                <p className="valid-name__title">Aaron Rathburn</p>
                <div className="label-content --primary">Primary</div>
              </div>
              <div className="valid-phone tooltip">
                <div className="valid-phone__number active">
                  <div className="cursor-pointer tooltip">
                    <p className="txt-ellipsis txt-phone-number">(678) 644-7678</p>
                  </div>
                </div>
                <div className="valid-phone__btn" title="Mobile">
                  <span className="phone-type">Mobile</span>
                </div>
              </div>
              <a href="mailto:vwabr337@yahoo.com" className="is-link">
                vwabr337@yahoo.com
              </a>
              <div className="details-info flex-column gap-8" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
