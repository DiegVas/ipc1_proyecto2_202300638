import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import RoutesNavigator from "./Routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RoutesNavigator />
  </BrowserRouter>
);
