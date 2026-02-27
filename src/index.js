import React from "react";
import ReactDOM from "react-dom";

import { DataProvider } from "./contexts/DataContext";
import { OptionsProvider } from "./contexts/OptionsContext";

import "./styles/index.scss";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <OptionsProvider>
        <App />
      </OptionsProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
