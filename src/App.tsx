import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";

import Workspace from "./pages/Workspace";
import WebRecommend from "./pages/Workspace/Pages/WebRecommend";
import Genshin from "./pages/Workspace/Pages/Genshin";
import UVStatistics from "./pages/Workspace/Pages/UVStatistics";

import Mine from "./pages/Mine";
import Author from "./pages/Mine/Author";
import Setting from "./pages/Mine/Setting";

import NotFound from "./pages/NotFound";

function App() {
  return (
    /** 路由 */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/workspace" element={<Workspace />} />
        <Route path="/workspace/webRecommend" element={<WebRecommend />} />
        <Route path="/workspace/genshin" element={<Genshin />} />
        <Route path="/workspace/uvStatistics" element={<UVStatistics />} />

        <Route path="/mine" element={<Mine />} />
        <Route path="/mine/author" element={<Author />} />
        <Route path="/mine/setting" element={<Setting />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
