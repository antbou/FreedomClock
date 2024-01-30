import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Settings } from "luxon";
import "@/styles/index.css";
import App from "@/app/App";

Settings.defaultZone = "Europe/Zurich";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
