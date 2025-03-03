import { useState } from "react";
import WorldMap from "./components/WorldMap";
import NodeInfo from "./components/NodeInfo";
import { InfoBar } from "./components/infobar";
import { Stats } from "./components/stats";

function App() {
  const [activeNode, setActiveNode] = useState(null);
  const handleMarkerClick = (node) => {
    // Set the active node
    setActiveNode(node);
  };

  return (
    <div className="h-screen w-screen relative">
      <InfoBar />
      <Stats />
      <WorldMap activeNode={activeNode} onMarkerClick={handleMarkerClick} />
      <NodeInfo node={activeNode} setActiveNode={setActiveNode} />
    </div>
  );
}

export default App;
