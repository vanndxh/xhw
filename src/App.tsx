import { Route, Routes, BrowserRouter } from "react-router-dom";
import { routes } from "./utils/routes";

function App() {
  return (
    /** 路由 */
    <BrowserRouter>
      <Routes>
        {routes.map((i) => {
          i?.children?.map((j) => (
            <Route path={j.path} element={j.element} key={j.path} />
          ));
          return <Route path={i.path} element={i.element} key={i.path} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
