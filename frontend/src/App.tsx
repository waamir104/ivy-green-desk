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
        <Route index element={<CalendarPage />} />
        <Route path="customers/:id" element={<CustomerDetailPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="settings/*" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
