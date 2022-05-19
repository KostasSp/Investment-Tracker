import "./App.scss";
import FetchStock from "./FetchStock";
import SideBar from "./components/sidebar/SideBar.jsx";
import { FetchCryptoRealTime } from "./components/realtime-crypto/FetchCryptoRealTime.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path={"/"} element={<FetchCryptoRealTime />} />
          <Route path="/realtime-stock-updates" element={<FetchStock />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
