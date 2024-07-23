import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "font-awesome/css/font-awesome.css";
import "./sass/stylesheets/main.css";
// import "../node_modules/bootstrap-icons/bootstrap-icons.css";
import "./index.css";
import { APIRequestErrorProvider } from "./utils/contexts/APIRequestErrorContext.tsx";
import { ScrollProvider } from "./utils/contexts/ScrollContext.tsx";
import { CurrentUserProvider } from "./utils/contexts/CurrentUserContext.tsx";
import { ThemeProvider } from "./utils/contexts/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <APIRequestErrorProvider>
      <ThemeProvider>
        <ScrollProvider>
          <CurrentUserProvider>
            <App />
          </CurrentUserProvider>
        </ScrollProvider>
      </ThemeProvider>
    </APIRequestErrorProvider>
  </React.StrictMode>
);
