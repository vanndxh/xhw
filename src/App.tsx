import { Route, Routes, MemoryRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import BottomBar from "./components/BottomBar";
import "./App.css";

function App() {
  return (
    <Router initialEntries={["/home"]}>
      <div className="app">
        <div className="body">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/mine" element={<Mine />} />
          </Routes>
        </div>
        <div className="bottom">
          <BottomBar />
        </div>
      </div>
    </Router>
  );
}

export default App;
