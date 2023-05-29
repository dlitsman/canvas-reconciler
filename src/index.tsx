import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "./reconciler/canvas";
import { createRoot as createRootLog } from "./reconciler/console-log-renderer";

const root = createRootLog();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("!!!DONE!!!");

setTimeout(() => {
  root.render(
    <React.StrictMode>
      <App name="TEST" />
    </React.StrictMode>
  );
}, 1000);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
