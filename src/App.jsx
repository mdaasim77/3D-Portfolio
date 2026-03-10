import { Canvas } from "@react-three/fiber";
import { Environment, Stars, OrbitControls } from "@react-three/drei";
import Laptop from "./Components/Laptop";
import StartScreen from "./Ui/StartScreen";
import { useState, useEffect, useRef } from "react";
import CameraController from "./Components/CameraController";
import Hero from "./Ui/Hero";
import Website from "./Scenes/Website";
import Hotspots from "./Components/Hotspots";
import LaptopScreen from "./Ui/LaptopScreen";
import HotspotInfo from "./Ui/HotspotInfo";

export default function App() {
  const [start, setStart] = useState(false);
  const [explore, setExplore] = useState(false);
  const [focusLaptop, setFocusLaptop] = useState(false);
  const [enterWebsite, setEnterWebsite] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const overlayRef = useRef(null);

  useEffect(() => {
    if (!enterWebsite) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [enterWebsite]);

  useEffect(() => {
    window.enterWebsite = () => setEnterWebsite(true);
  }, []);

  return (
    <>
      {!start && <StartScreen onStart={() => setStart(true)} />}

      {start && !explore && !focusLaptop && (
        <Hero onExplore={() => setExplore(true)} />
      )}

      {/* ⭐ Hotspot UI (outside Canvas) */}
      {activeHotspot && (
        <HotspotInfo
          name={activeHotspot}
          onBack={() => setActiveHotspot(null)}
        />
      )}

      {/* WEBSITE OVERLAY */}
      {enterWebsite && (
        <div ref={overlayRef} className="websiteOverlay">
          <Website scrollerRef={overlayRef} />
        </div>
      )}

      <Canvas camera={{ position: [50, 36, 45], fov: 40 }}>
        <CameraController
          start={start}
          explore={explore}
          focusLaptop={focusLaptop}
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

        <Laptop
          explore={explore}
          focusLaptop={focusLaptop}
          onLaptopClick={() => setFocusLaptop(true)}
        />

        <LaptopScreen activeHotspot={activeHotspot} />

        {explore && !focusLaptop && (
          <Hotspots setActiveHotspot={setActiveHotspot} />
        )}

        {explore && !focusLaptop && !activeHotspot && (
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
