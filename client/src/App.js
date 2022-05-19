import "./App.scss";
import SideBar from "./SideBar.js";
import { FetchStock } from "./FetchStock.jsx";
import { FetchCryptoRealTime } from "./components/realtime-crypto/FetchCryptoRealTime.jsx";

//RAFCE + tab -> makes react component boilerplate

function App() {
  return (
    <div>
      <SideBar />
      {/* <FetchStock /> */}
      <FetchCryptoRealTime />
    </div>
  );
}

export default App;
