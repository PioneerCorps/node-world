import { useState } from "react";
import "./App.css";
import GlobeContainer from "./components/GlobeContainer";
import { InfoCard } from "./components/infoCard";

function App() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="App relative">
      <InfoCard activeNode={activeNode} />
      <GlobeContainer setActiveNode={setActiveNode} />
    </div>
  );
}

export default App;
