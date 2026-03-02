import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { NewCustomerModalProvider } from "../context/NewCustomerModalContext";
import { NewLineItemModalProvider } from "../context/NewLineItemModalContext";
import { EditLineItemModalProvider } from "../context/EditLineItemModalContext";
import { NewSourceModalProvider } from "../context/NewSourceModalContext";
import { NewPaymentMethodModalProvider } from "../context/NewPaymentMethodModalContext";
import { EditPaymentMethodModalProvider } from "../context/EditPaymentMethodModalContext";
import { NewUserModalProvider } from "../context/NewUserModalContext";
import { EditUserModalProvider } from "../context/EditUserModalContext";
import { NewScheduleModalProvider } from "../context/NewScheduleModalContext";
import { NewTagModalProvider } from "../context/NewTagModalContext";
import { EditTagModalProvider } from "../context/EditTagModalContext";

export const AppPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <NewCustomerModalProvider>
      <NewLineItemModalProvider>
      <EditLineItemModalProvider>
      <NewUserModalProvider>
      <EditUserModalProvider>
      <NewScheduleModalProvider>
      <NewSourceModalProvider>
      <NewPaymentMethodModalProvider>
      <EditPaymentMethodModalProvider>
      <NewTagModalProvider>
      <EditTagModalProvider>
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
      </EditTagModalProvider>
      </NewTagModalProvider>
      </EditPaymentMethodModalProvider>
      </NewPaymentMethodModalProvider>
      </NewSourceModalProvider>
      </NewScheduleModalProvider>
      </EditUserModalProvider>
      </NewUserModalProvider>
      </EditLineItemModalProvider>
      </NewLineItemModalProvider>
    </NewCustomerModalProvider>
  );
};

