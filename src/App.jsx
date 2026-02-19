import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import Laptop from "./Components/Laptop";
import StartScreen from "./Ui/StartScreen";
import { useState } from "react";
import CameraController from "./Components/CameraController";

export default function App() {
  const [start, setStart] = useState(false);

  return (
    <>
      {!start && <StartScreen onStart={() => setStart(true)} />}

      <Canvas camera={{ position: [0, 3, 90], fov: 45 }}>
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

        <Laptop scale={0.4} />

        {/* Disable controls after start */}
        {!start && (
          <OrbitControls
            target={[30, 10, 30]}
            enablePan={false}
            minDistance={5}
            maxDistance={70}
          />
        )}
      </Canvas>
    </>
  );
}
