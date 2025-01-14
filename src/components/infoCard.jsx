import React, { useState, useRef, useEffect } from "react";
import { coordinates } from "../data";

export const InfoCard = ({ activeNode }) => {
  const [expandedNode, setExpandedNode] = useState(null);
  const contentRefs = useRef({});

  // Reset expanded node when hovering over a pin
  useEffect(() => {
    if (activeNode) {
      setExpandedNode(null);
    }
  }, [activeNode]);

  // Function to check if a node is active (either by hover or click)
  const isNodeActive = (item) => {
    // If there's an active hover, only show that node
    if (activeNode) {
      return activeNode.lat === item.lat && activeNode.lon === item.lon;
    }
    // Otherwise, show the clicked node
    return expandedNode?.lat === item.lat && expandedNode?.lon === item.lon;
  };

  // Toggle node expansion on header click
  const toggleNode = (item) => {
    if (expandedNode?.lat === item.lat && expandedNode?.lon === item.lon) {
      setExpandedNode(null);
    } else {
      setExpandedNode(item);
    }
  };

  const nodeList = () => {
    return coordinates.map((item, index) => {
      const isActive = isNodeActive(item);
      const contentRef = useRef();
      contentRefs.current[index] = contentRef;

      return (
        <div
          key={index}
          className={`mb-2 rounded-lg transition-all duration-300 overflow-hidden ${
            isActive
              ? "bg-black/80 backdrop-blur-sm"
              : "bg-black/40 hover:bg-black/60"
          }`}
        >
          <div
            className="p-4 cursor-pointer flex items-center justify-between"
            onClick={() => toggleNode(item)}
          >
            <h3 className="text-white text-sm flex items-center justify-center gap-2">
              <div className=" w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {item.entity}
            </h3>
            <span
              className="text-gray-400 transition-transform duration-300"
              style={{
                transform: isActive ? "rotate(0deg)" : "rotate(-90deg)",
              }}
            >
              ▼
            </span>
          </div>

          <div
            className="transition-all duration-300 overflow-hidden"
            style={{
              height: isActive ? contentRef.current?.scrollHeight + "px" : "0",
              opacity: isActive ? 1 : 0,
            }}
          >
            <div
              ref={contentRef}
              className="px-4 pb-4 space-y-3 text-sm text-gray-300"
            >
              <p>Latitude: {item.lat}</p>
              <p>Longitude: {item.lon}</p>
              <p className="pt-3 border-t border-gray-700/50">{item.desc}</p>
              <div className="flex gap-3 pt-3 border-t border-gray-700/50">
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Website
                </a>
                <a
                  href={item.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  X
                </a>
                <a
                  href={item.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Discord
                </a>
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="absolute top-4 right-4 w-80 h-full max-h-[calc(100%-4rem)] overflow-y-auto space-y-2 p-2 z-50 bg-gray-500 bg-opacity-20 border border-gray-800 rounded-xl">
      <div className="px-2 py-4 font-bold border-b mb-5 border-gray-800">
        Node List
      </div>
      {nodeList()}
    </div>
  );
};
