import "./App.scss";
import { FetchStockRealTime } from "./components/realtime-stock/FetchStockRealTime.jsx";
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
          <Route
            path="/realtime-stock-updates"
            element={<FetchStockRealTime />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
