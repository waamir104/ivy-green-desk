import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { LabelsProvider } from "./shared/LabelsContext";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LabelsProvider>
        <App />
      </LabelsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

