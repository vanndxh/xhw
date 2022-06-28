import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import Author from "./pages/Mine/Author";
import Setting from "./pages/Mine/Setting";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/mine/author" element={<Author />} />
        <Route path="/mine/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
