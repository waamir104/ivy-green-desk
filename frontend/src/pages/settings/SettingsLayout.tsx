import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LineItemsProvider } from "./LineItemsContext";
import { SettingsSidebar } from "./SettingsSidebar";
import { SettingsHeader } from "./SettingsHeader";

export const SettingsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <LineItemsProvider>
      <div
        className={`container-wrap container-setting custom-grid-sidebar container-table${!sidebarOpen ? " settings-sidebar-hidden" : ""}`}
      >
        <div className="settings-header-full">
          <SettingsHeader
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
        </div>
        <SettingsSidebar ariaHidden={!sidebarOpen} />
        <div className="settings-body">
          <div className="wrapper-columns">
            <Outlet />
          </div>
        </div>
      </div>
    </LineItemsProvider>
  );
};
