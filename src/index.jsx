import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import ReactDom from "react-dom";
import App from "./shared/App";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

ReactDom.render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
