import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { NewCustomerModalProvider } from "../context/NewCustomerModalContext";
import { NewLineItemModalProvider } from "../context/NewLineItemModalContext";
import { EditLineItemModalProvider } from "../context/EditLineItemModalContext";
import { NewSourceModalProvider } from "../context/NewSourceModalContext";
import { NewUserModalProvider } from "../context/NewUserModalContext";
import { EditUserModalProvider } from "../context/EditUserModalContext";

export const AppPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <NewCustomerModalProvider>
      <NewLineItemModalProvider>
      <EditLineItemModalProvider>
      <NewUserModalProvider>
      <EditUserModalProvider>
      <NewSourceModalProvider>
      <div id="main-page">
        <Header
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <div className={`app-body${sidebarOpen ? "" : " sidebar-hidden"}`}>
          <Sidebar />
          <main className="app-main-content">
            <div className="app-main-content__inner">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      </NewSourceModalProvider>
      </EditUserModalProvider>
      </NewUserModalProvider>
      </EditLineItemModalProvider>
      </NewLineItemModalProvider>
    </NewCustomerModalProvider>
  );
};

