import { Canvas } from "@react-three/fiber";
import { Environment, Stars, OrbitControls } from "@react-three/drei";
import Laptop from "./Components/Laptop";
import StartScreen from "./Ui/StartScreen";
import { useState } from "react";
import CameraController from "./Components/CameraController";
import Hero from "./Ui/Hero";

export default function App() {
  const [start, setStart] = useState(false);
  const [cameraDone, setCameraDone] = useState(false);
  const [explore, setExplore] = useState(false);
  const [focusLaptop, setFocusLaptop] = useState(false);

  return (
    <>
      {!start && <StartScreen onStart={() => setStart(true)} />}
      {/* {cameraDone && <Hero onExplore={() => setExplore(true)} />} */}
      {start && !explore && !focusLaptop && (
        <Hero onExplore={() => setExplore(true)} />
      )}
      <Canvas camera={{ position: [50, 36, 45], fov: 40 }}>
        <CameraController
          start={start}
          explore={explore}
          onComplete={() => setCameraDone(true)}
        />

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

        <Laptop onLaptopClick={() => setFocusLaptop(true)} />

        {/* enable mouse control only after explore */}
        {explore && (
          <OrbitControls
            target={[52, 2, 0]}
            enablePan={false}
            minDistance={5}
            maxDistance={120}
          />
        )}
      </Canvas>
    </>
  );
}
