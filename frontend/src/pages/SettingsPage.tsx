import { Routes, Route, Navigate } from "react-router-dom";
import { SettingsLayout } from "./settings/SettingsLayout";
import { SettingsCompanyPage } from "./settings/SettingsCompanyPage";
import { SettingsUsersPage } from "./settings/SettingsUsersPage";
import { SettingsPlaceholderPage } from "./settings/SettingsPlaceholderPage";
import { SettingsLineItemsPage } from "./settings/SettingsLineItemsPage";
import { SettingsTaxesPage } from "./settings/SettingsTaxesPage";
import { SettingsPaymentMethodsPage } from "./settings/SettingsPaymentMethodsPage";
import { SettingsSourcesPage } from "./settings/SettingsSourcesPage";
import { SettingsSchedulesPage } from "./settings/SettingsSchedulesPage";

export const SettingsPage = () => {
  return (
    <Routes>
      <Route element={<SettingsLayout />}>
        <Route index element={<Navigate to="company" replace />} />
        <Route path="company" element={<SettingsCompanyPage />} />
        <Route path="account" element={<SettingsPlaceholderPage />} />
        <Route path="plans" element={<SettingsPlaceholderPage />} />
        <Route path="invoices" element={<SettingsPlaceholderPage />} />
        <Route path="users" element={<SettingsUsersPage />} />
        <Route path="schedules" element={<SettingsSchedulesPage />} />
        <Route path="taxes" element={<SettingsTaxesPage />} />
        <Route path="items" element={<SettingsLineItemsPage />} />
        <Route path="paperwork" element={<SettingsPlaceholderPage />} />
        <Route path="paymentmethods" element={<SettingsPaymentMethodsPage />} />
        <Route path="service" element={<SettingsPlaceholderPage />} />
        <Route path="sources" element={<SettingsSourcesPage />} />
        <Route path="tags" element={<SettingsPlaceholderPage />} />
        <Route path="tiles" element={<SettingsPlaceholderPage />} />
        <Route path="templates" element={<SettingsPlaceholderPage />} />
        <Route path="emails" element={<SettingsPlaceholderPage />} />
        <Route path="customs" element={<SettingsPlaceholderPage />} />
        <Route path="broadcast" element={<SettingsPlaceholderPage />} />
        <Route path="emailinbox" element={<SettingsPlaceholderPage />} />
      </Route>
    </Routes>
  );
};
