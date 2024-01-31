import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Settings } from "luxon";
import { RouterProvider } from "react-router-dom";

import "@/styles/index.css";
import router from "./app/Router";

Settings.defaultZone = "Europe/Zurich";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
