import React, { useRef, useState } from "react";
import { useTexture, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { coordinates } from "../data";
const LocationPin = ({ position, index, setActiveNode, info }) => {
  // Rotate the pin to point outward from the globe's surface
  const pinRotation = position.clone().normalize();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pinRotation);

  return (
    <group
      position={position}
      quaternion={quaternion}
      onPointerOver={() => setActiveNode(info)}
      onPointerOut={() => setActiveNode(null)}
    >
      {/* Pin head */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF4444" />
      </mesh>
      {/* Pin body */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};

const Globe = ({ setActiveNode }) => {
  const meshRef = useRef();
  const earthTexture = useTexture("/earth-texture.jpg");
  const [hoveredPinIndex, setHoveredPinIndex] = useState(null);

  // Convert lat/long to 3D coordinates
  const createPoint = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const radius = 5.1; // Slightly larger than the globe radius

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  return (
    <group>
      <Sphere ref={meshRef} args={[5, 64, 64]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>

      {/* Render location pins */}
      {coordinates.map((coord, index) => {
        const point = createPoint(coord.lat, coord.lon);
        return (
          <LocationPin
            key={index}
            position={point}
            index={index}
            info={coord}
            setActiveNode={setActiveNode}
          />
        );
      })}
    </group>
  );
};

export default Globe;
