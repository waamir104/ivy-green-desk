import { Link, useParams } from "react-router-dom";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="var(--color-icon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container-wrap customer-detail-page" id="wrapper-customer-detail">
      <div className="customer-detail-page__header">
        <Link to="/app/customers" className="v2-btn-default --transparent back-link">
          <BackIcon />
          <span>Back to Customers</span>
        </Link>
      </div>
      <div className="customer-detail-page__content">
        <h1 className="customer-detail-page__title">Customer {id}</h1>
        <p className="customer-detail-page__subtitle">Detail view for customer ID: {id}</p>
      </div>
    </div>
  );
};
