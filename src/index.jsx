import { HashRouter } from "react-router-dom";
import * as React from "react";
import ReactDom from "react-dom";
import App from "./shared/App";
import "./index.css";

ReactDom.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.querySelector("#root")
);
