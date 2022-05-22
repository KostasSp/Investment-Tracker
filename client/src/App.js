import "./App.scss";
import SideBar from "./components/sidebar/SideBar.jsx";
import { FetchStockRealTime } from "./components/realtime-stocks/FetchStockRealTime.jsx";
import { FetchCryptoRealTime } from "./components/realtime-crypto/FetchCryptoRealTime.jsx";
import FetchCryptoDaily from "./components/daily-crypto/FetchCryptoDaily";
import FetchStockDaily from "./components/daily-stock/FetchStockDaily";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelpCenter from "./components/help-center/HelpCenter";

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
          <Route
            path="/daily-cryptocurrency-updates"
            element={<FetchCryptoDaily />}
          />
          <Route path="/daily-stock-updates" element={<FetchStockDaily />} />
          <Route exact path="/help-center" element={<HelpCenter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
