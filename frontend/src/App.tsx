import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { AppPage } from "./pages/AppPage";
import { CalendarPage } from "./pages/CalendarPage";
import { CustomersPage } from "./pages/CustomersPage";
import { CustomerDetailPage } from "./pages/CustomerDetailPage";
import { SettingsPage } from "./pages/SettingsPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppPage />}>
        <Route index element={<CustomersPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="customers/account/:id" element={<CustomerDetailPage />} />
        <Route path="customers/contacts/:id" element={<CustomerDetailPage />} />
        <Route path="customers/locations/:id" element={<CustomerDetailPage />} />
        <Route path="customers/jobs/:id" element={<CustomerDetailPage />} />
        <Route path="customers/invoices/:id" element={<CustomerDetailPage />} />
        <Route path="customers/estimates/:id" element={<CustomerDetailPage />} />
        <Route path="customers/payments/:id" element={<CustomerDetailPage />} />
        <Route path="customers/credits/:id" element={<CustomerDetailPage />} />
        <Route path="customers/documents/:id" element={<CustomerDetailPage />} />
        <Route path="customers/:id" element={<CustomerDetailPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="settings/*" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
