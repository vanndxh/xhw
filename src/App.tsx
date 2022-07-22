import { Route, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import Author from "./pages/Mine/Author";
import Setting from "./pages/Mine/Setting";
import NotFound from "./pages/NotFound";
import Genshin from "./pages/Genshin";

function App() {
  /** 请求的基础地址 */
  axios.defaults.baseURL = "http://localhost:8088";

  return (
    /** 路由 */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genshin" element={<Genshin />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/mine/author" element={<Author />} />
        <Route path="/mine/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
