import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { coordinates } from "../data";

// Fixed zoom level for tile loading
const FIXED_TILE_ZOOM = 7;

// Define marker colors
const MARKER_COLORS = {
  DEFAULT: "#31A67B", // Pastel Green - normal state
  HOVER: "#EDA1FF", // Pastel Pink - hovered state
  ACTIVE: "#FF9F6B", // Orange - selected state
};

function WorldMap({ activeNode, onMarkerClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      // Add these options to improve marker performance
      trackResize: true,
      renderWorldCopies: true,
      antialias: true,
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          // Use vector tiles for styling countries
          "natural-earth": {
            type: "vector",
            // Natural Earth data from MapTiler
            url: "https://demotiles.maplibre.org/tiles/tiles.json",
          },
          // Keep raster tiles as a background
          "dark-background": {
            type: "raster",
            tiles: [
              "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            maxzoom: FIXED_TILE_ZOOM,
            attribution: "",
          },
        },
        layers: [
          // Background ocean layer
          {
            id: "background",
            type: "background",
            paint: {
              "background-color": "#22103A", // Dark purple for oceans (bgDark1)
            },
          },
          // Dark background raster
          {
            id: "dark-background-layer",
            type: "raster",
            source: "dark-background",
            minzoom: 0,
            maxzoom: 22,
            paint: {
              "raster-opacity": 0,
            },
          },
          // Country fill layer
          {
            id: "countries-fill",
            type: "fill",
            source: "natural-earth",
            "source-layer": "countries",
            paint: {
              "fill-color": "#8C7EFF29", // bgDark2 - dark purple for countries
            },
          },
          // Country boundary lines
          {
            id: "countries-boundary",
            type: "line",
            source: "natural-earth",
            "source-layer": "countries",
            paint: {
              "line-color": "#70638347", // pastelPurple
              "line-width": 0.5,
            },
          },
        ],
        // Use a valid glyphs URL format (required by MapLibre)
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      },
      center: [0, 20],
      zoom: 2,
      minZoom: 1,
      maxZoom: 8,
      // Disable map transitions to prevent tile reloading
      fadeDuration: 0,
      // Disable raster fade-in
      rasterFadeDuration: 0,
      // Disable terrain
      terrain: false,
      // Disable fog
      fog: false,
      // Disable attributions
      attributionControl: false,
      // Disable the default UI controls
      boxZoom: false,
      doubleClickZoom: false,
      dragRotate: false,
      touchZoomRotate: false,

      // Increase max cache size
      maxTileCacheSize: 100,
      // Prevent loading higher resolution tiles when zooming in
      preserveDrawingBuffer: true,
    });

    // Disable tile fade-in animation
    map.current.on("sourcedata", (e) => {
      if (e.isSourceLoaded && e.sourceId === "dark-tiles") {
        const source = map.current.getSource("dark-tiles");
        if (source && source.rasterFadeDuration) {
          source.rasterFadeDuration = 0;
        }
      }
    });

    // Set up event handlers
    map.current.on("load", () => {
      setMapLoaded(true);

      // Force the map to use the fixed zoom level for tile requests
      try {
        const originalTileUrlFunction =
          map.current.getSource("dark-background").getTileUrl;
        map.current.getSource("dark-background").getTileUrl = function (coord) {
          // Replace the zoom level with our fixed zoom level
          const fixedCoord = {
            z: Math.min(coord.z, FIXED_TILE_ZOOM),
            x: coord.x,
            y: coord.y,
          };
          return originalTileUrlFunction.call(this, fixedCoord);
        };
      } catch (e) {
        console.log("Could not modify tile URL function", e);
      }

      // Add markers after map is loaded
      addMarkers();
    });

    // Function to add markers to the map
    const addMarkers = () => {
      // Clear any existing markers
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];

      // Add markers for each coordinate
      coordinates.forEach((coord) => {
        // Create a simple marker element
        const el = document.createElement("div");

        // Apply styles directly
        Object.assign(el.style, {
          width: "20px",
          height: "20px",
          borderRadius: "30%",
          backgroundColor: MARKER_COLORS.DEFAULT, // Normal state
          border: "2px solid #fff",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          transition: "background-color 0.3s ease",
        });

        // Store coordinate data on the element for reference
        el.coordData = coord;

        // Create the marker
        const marker = new maplibregl.Marker({
          element: el,
          anchor: "center",
          rotation: 45,
          // Ensure markers move with the map
          pitchAlignment: "viewport",
          rotationAlignment: "viewport",
        })
          .setLngLat([coord.lon, coord.lat])
          .addTo(map.current);

        // Store the marker and its data
        marker.nodeData = coord;
        markers.current.push(marker);

        // Add click handler using the MapLibre API
        marker.getElement().addEventListener("click", () => {
          // Log node information to console

          // Reset all markers to default state
          markers.current.forEach((m) => {
            m.getElement().style.backgroundColor = MARKER_COLORS.DEFAULT; // Normal state
          });

          // Set this marker to active/selected state
          el.style.backgroundColor = MARKER_COLORS.ACTIVE; // Selected state

          // Call the onMarkerClick prop with the coordinate data
          if (onMarkerClick) {
            onMarkerClick(coord);
          }
        });

        // Add hover effects
        el.addEventListener("mouseenter", () => {
          // Check if this is the active marker
          const isActiveMarker =
            activeNode &&
            activeNode.lat === coord.lat &&
            activeNode.lon === coord.lon;

          // If it's not the active marker, change to hover color
          if (!isActiveMarker) {
            el.style.backgroundColor = MARKER_COLORS.HOVER; // Hover state
          }
        });

        el.addEventListener("mouseleave", () => {
          // Check if this is the active marker
          const isActiveMarker =
            activeNode &&
            activeNode.lat === coord.lat &&
            activeNode.lon === coord.lon;
          console.log({ activeNode, coord });
          // If it's the active marker, keep it orange
          if (isActiveMarker) {
            el.style.backgroundColor = MARKER_COLORS.ACTIVE; // Keep active state
          } else {
            el.style.backgroundColor = MARKER_COLORS.DEFAULT; // Normal state
          }
        });

        // If this is the active node, set it to active state immediately
        if (
          activeNode &&
          activeNode.lat === coord.lat &&
          activeNode.lon === coord.lon
        ) {
          el.style.backgroundColor = MARKER_COLORS.ACTIVE; // Selected state
        }
      });
    };
  }, [activeNode, onMarkerClick]);

  // Effect to update marker colors when active node changes
  useEffect(() => {
    if (!map.current || !markers.current.length || !mapLoaded) return;

    // Reset all markers to default state
    markers.current.forEach((marker) => {
      marker.getElement().style.backgroundColor = MARKER_COLORS.DEFAULT;
    });

    // If there's an active node, find and highlight its marker
    if (activeNode) {
      const activeMarker = markers.current.find((marker) => {
        const data = marker.nodeData;
        return (
          data && data.lat === activeNode.lat && data.lon === activeNode.lon
        );
      });

      if (activeMarker) {
        activeMarker.getElement().style.backgroundColor = MARKER_COLORS.ACTIVE;
      }
    }
  }, [activeNode, mapLoaded]);

  return (
    <div className="h-full w-full relative z-[100]">
      <div
        ref={mapContainer}
        className="w-full h-full absolute top-0 left-0 rounded-lg overflow-hidden shadow-lg mb-8"
      />
    </div>
  );
}

export default WorldMap;
