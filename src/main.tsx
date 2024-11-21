import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SpotifyProvider } from "./Context/SpotifyContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SpotifyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SpotifyProvider>
  </StrictMode>
);
