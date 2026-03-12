
import { Canvas } from "@react-three/fiber";
import { Environment, Stars, OrbitControls } from "@react-three/drei";
import Laptop from "./Components/Laptop";
import StartScreen from "./Ui/StartScreen";
import { useState, useEffect, useRef } from "react";
import CameraController from "./Components/CameraController";
import Hero from "./Ui/Hero";
import Website from "./Scenes/Website";
import Hotspots from "./Components/Hotspots";
import HotspotInfo from "./Ui/HotspotInfo";

function Products() {
  const products = [
    {
      id: 1,
      name: "Apple MacBook Pro",
      price: "$1,999",
      description: "Next-generation performance. M3 chip. All day battery life.",
    },
    {
      id: 2,
      name: "AirPods Max",
      price: "$549",
      description: "High-fidelity audio. Active noise cancellation.",
    },
    {
      id: 3,
      name: "Product Three",
      price: "$499",
      description: "Your third product description goes here.",
    },
  ];

  return (
    <div className="productsScroll">
      {products.map((p, i) => (
        <div key={p.id} className="productScrollSection">
          <span className="productNumber">0{i + 1}</span>
          <h2 className="productName">{p.name}</h2>
          <p className="productDesc">{p.description}</p>
          <span className="productPrice">{p.price}</span>
          <button className="productBtn">View Details</button>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [start, setStart] = useState(false);
  const [explore, setExplore] = useState(false);
  const [focusLaptop, setFocusLaptop] = useState(false);
  const [enterWebsite, setEnterWebsite] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [productsVisible, setProductsVisible] = useState(false);  // ← new

  const overlayRef = useRef(null);
  const goBackRef = useRef(null);
  const mainPageRef = useRef(null);

  useEffect(() => {
    window.enterWebsite = () => setEnterWebsite(true);
  }, []);

  useEffect(() => {
    if (!start) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [start]);

  return (
    <>
      {!start && <StartScreen onStart={() => setStart(true)} />}

      {start && !explore && !focusLaptop && (
        <Hero
          onExplore={() => setExplore(true)}
          scrollRef={mainPageRef}
          onProductsVisible={setProductsVisible}  // ← new
        />
      )}

      {activeHotspot && !focusLaptop && !enterWebsite && (
        <HotspotInfo
          name={activeHotspot.name}
          cardPosition={activeHotspot.cardPosition}
          onBack={() => goBackRef.current?.()}
        />
      )}

      <div className="mainPage" ref={mainPageRef}>
        <div className="canvasWrapper">
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
              productsVisible={productsVisible}  // ← new
              onLaptopClick={() => {
                setFocusLaptop(true);
                setActiveHotspot(null);
              }}
            />
            {explore && !focusLaptop && (
              <Hotspots
                setActiveHotspot={setActiveHotspot}
                onGoBack={(fn) => (goBackRef.current = fn)}
                setFocusLaptop={setFocusLaptop}
                setEnterWebsite={setEnterWebsite}
              />
            )}
            {explore && !focusLaptop && !activeHotspot && (
              <OrbitControls
                makeDefault
                target={[52, 2, 0]}
                enablePan={false}
                minDistance={5}
                maxDistance={120}
              />
            )}
          </Canvas>
        </div>
        <Products />
      </div>

      {enterWebsite && (
        <div ref={overlayRef} className="websiteOverlay">
          <Website scrollerRef={overlayRef} />
        </div>
      )}
    </>
  );
}