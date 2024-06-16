import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./utils/routes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const RouteElement = () => useRoutes(routes);

root.render(
  <BrowserRouter>
    <RouteElement />
  </BrowserRouter>
);
