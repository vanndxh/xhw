import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./utils/routes";

function App() {
  const RouteElement = () => useRoutes(routes as any);

  return (
    <BrowserRouter>
      <RouteElement />
    </BrowserRouter>
  );
}

export default App;
