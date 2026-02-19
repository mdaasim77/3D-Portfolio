import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import Laptop from "./Components/Laptop";
import StartScreen from "./Ui/StartScreen";
import { useState } from "react";
import CameraController from "./Components/CameraController";
import Hero from "./Ui/Hero";

export default function App() {
  const [start, setStart] = useState(false);

  return (
    <>
      {/* Start screen curtain */}
      {!start && <StartScreen onStart={() => setStart(true)} />}

      {/* Hero text appears AFTER camera finishes */}
      {start && <Hero />}

      <Canvas camera={{ position: [18, 36, 90], fov: 80 }}>
        <CameraController start={start} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[20, 10, 20]} intensity={1.5} />

        <Stars
          radius={80}
          depth={50}
          count={100000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Environment
          files="/src/assets/hdr/space.hdr"
          background
          backgroundIntensity={0.1}
          backgroundBlurriness={0.1}
        />

        <Laptop />
      </Canvas>
    </>
  );
}
