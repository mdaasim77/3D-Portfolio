import React from "react";
import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
      <ambientLight intensity={1} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
}
