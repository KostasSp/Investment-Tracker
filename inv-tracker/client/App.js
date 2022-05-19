import "./App.css";
import SideBar from "./SideBar.js";
import { FetchStock } from "./FetchStock.jsx";
import { FetchCrypto } from "./FetchCrypto.jsx";

//RAFCE + tab -> makes react component boilerplate

function App() {
  return (
    <div>
      <SideBar />
      {/* <FetchStock /> */}
      <FetchCrypto />
    </div>
  );
}

export default App;
