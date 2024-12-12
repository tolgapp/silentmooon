import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import CheckFormat from "./components/CheckFormat.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CheckFormat>
        <App />
      </CheckFormat>
    </BrowserRouter>
  </StrictMode>
);
