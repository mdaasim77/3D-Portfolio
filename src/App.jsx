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
import ProductDetail from "./Ui/ProductDetail";
import PRODUCTS from "./data/products";

function ProductCard({ p, i, onViewDetails }) {
  const cardRef = useRef();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="productScrollSection">
      <div className="productInfo">
        <span className="productNumber">0{i + 1}</span>
        <h2 className="productName">{p.name}</h2>
        <p className="productDesc">{p.description}</p>
        <span className="productPrice">{p.price}</span>
        <button className="productBtn" onClick={() => onViewDetails(p)}>
          View Details
        </button>
      </div>
    </div>
  );
}

function Products({ onViewDetails }) {
  return (
    <div className="productsScroll">
      {PRODUCTS.map((p, i) => (
        <ProductCard key={p.id} p={p} i={i} onViewDetails={onViewDetails} />
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
  const [productsVisible, setProductsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const overlayRef = useRef(null);
  const goBackRef = useRef(null);
  const mainPageRef = useRef(null);

  // ← removed window.enterWebsite useEffect

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
          onProductsVisible={setProductsVisible}
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
              onFocusComplete={() => {
                setTimeout(() => setEnterWebsite(true), 300); // ← clean trigger
              }}
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
              files="/hdr/space.hdr" 
              background
              backgroundIntensity={0.1}
              backgroundBlurriness={0.1}
            />
            <Laptop
              explore={explore}
              focusLaptop={focusLaptop}
              productsVisible={productsVisible}
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
        <Products onViewDetails={setSelectedProduct} />
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      )}

      {enterWebsite && (
        <div ref={overlayRef} className="websiteOverlay">
          <Website scrollerRef={overlayRef} />
        </div>
      )}
    </>
  );
}
