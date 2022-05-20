import "./App.scss";
import { FetchStockRealTime } from "./components/realtime-stock/FetchStockRealTime.jsx";
import SideBar from "./components/sidebar/SideBar.jsx";
import { FetchCryptoRealTime } from "./components/realtime-crypto/FetchCryptoRealTime.jsx";
import FetchStockDaily from "./components/daily-stock/FetchStockDaily";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <SideBar />
        <Routes>
          {["/", "/realtime-cryptocurrency-updates"].map((path, index) => (
            <Route key={index} path={path} element={<FetchCryptoRealTime />} />
          ))}
          <Route
            path="/realtime-stock-updates"
            element={<FetchStockRealTime />}
          />
          <Route path="/daily-stock-updates" element={<FetchStockDaily />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
