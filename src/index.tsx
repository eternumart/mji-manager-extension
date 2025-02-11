import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/Extention/App/App";
import { ContextProvider } from "./context/Context"; // Импортируем контекст

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);