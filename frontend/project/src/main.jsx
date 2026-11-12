import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// router
import { BrowserRouter } from "react-router-dom";

// contexts
import LatestContext from "./contexts/latest.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LatestContext>
      <App />
    </LatestContext>
  </BrowserRouter>,
);
