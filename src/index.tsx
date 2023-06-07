import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Container, createRoot } from "./reconciler/canvas";
import { CanvasPainter } from "./utils/canvas-painter";

const canvas = document.getElementById("canvas");
if (canvas == null) {
  throw new Error("Unable to locate root canvas");
}
const container: Container = {
  children: [],
  onUpdate: () => {
    painter.renderContainer();
  },
};
const painter = new CanvasPainter(
  canvas as HTMLCanvasElement,
  container,
  window.devicePixelRatio
);
painter.init();

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// console.log("!!!DONE!!!");

// setTimeout(() => {
//   root.render(
//     <React.StrictMode>
//       <App name="TEST" />
//       {"aaa"}
//     </React.StrictMode>
//   );
// }, 1000);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
