// import { Canvas } from "@react-three/fiber";
// import { Environment, Stars, OrbitControls } from "@react-three/drei";
// import Laptop from "./Components/Laptop";
// import StartScreen from "./Ui/StartScreen";
// import { useState, useEffect, useRef } from "react";
// import CameraController from "./Components/CameraController";
// import Hero from "./Ui/Hero";
// import Website from "./Scenes/Website";
// import Hotspots from "./Components/Hotspots";
// import HotspotInfo from "./Ui/HotspotInfo";
// import ProductDetail from "./Ui/ProductDetail";

// const PRODUCTS = [
//   {
//     id: 1,
//     name: "Apple MacBook Pro",
//     price: "$1,999",
//     description: "Next-generation performance. M3 chip. All day battery life.",
//     model: "/src/assets/models/macbook.glb",
//     scale: 4,
//   },
//   {
//     id: 2,
//     name: "AirPods Max",
//     price: "$549",
//     description:
//       "High-fidelity audio. Active noise cancellation. All day comfort.",
//     model: "/src/assets/models/airpods_max.glb",
//     scale: 0.7,
//   },
//   {
//     id: 3,
//     name: "iPhone 15 Pro",
//     price: "$999",
//     description: "Titanium design. A17 Pro chip. Pro camera system.",
//     model: "/src/assets/models/iphone.glb",
//     scale: 8,
//   },
//   {
//     id: 4,
//     name: "Apple Watch Ultra",
//     price: "$799",
//     description: "Most rugged Apple Watch. Precision dual-frequency GPS.",
//     model: "/src/assets/models/watch.glb",
//     scale: 0.7,
//   },
//   {
//     id: 5,
//     name: "iPad Pro",
//     price: "$1,099",
//     description: "M2 chip. Liquid Retina XDR display. All-day battery.",
//     model: "/src/assets/models/ipad.glb",
//     scale: 2,
//   },
//   {
//     id: 6,
//     name: "Mac Studio",
//     price: "$1,999",
//     description: "M2 Max chip. Incredible performance in a compact design.",
//     model: "/src/assets/models/macstudio.glb",
//     scale: 0.5,
//   },
// ];

// function ProductCard({ p, i, onViewDetails }) {
//   const cardRef = useRef();

//   useEffect(() => {
//     const el = cardRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           el.style.opacity = "1";
//           el.style.transform = "translateY(0)";
//         }
//       },
//       { threshold: 0.2 },
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div ref={cardRef} className="productScrollSection">
//       <div className="productInfo">
//         <span className="productNumber">0{i + 1}</span>
//         <h2 className="productName">{p.name}</h2>
//         <p className="productDesc">{p.description}</p>
//         <span className="productPrice">{p.price}</span>
//         <button className="productBtn" onClick={() => onViewDetails(p)}>
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// }

// function Products({ onViewDetails }) {
//   return (
//     <div className="productsScroll">
//       {PRODUCTS.map((p, i) => (
//         <ProductCard key={p.id} p={p} i={i} onViewDetails={onViewDetails} />
//       ))}
//     </div>
//   );
// }

// export default function App() {
//   const [start, setStart] = useState(false);
//   const [explore, setExplore] = useState(false);
//   const [focusLaptop, setFocusLaptop] = useState(false);
//   const [enterWebsite, setEnterWebsite] = useState(false);
//   const [activeHotspot, setActiveHotspot] = useState(null);
//   const [productsVisible, setProductsVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const overlayRef = useRef(null);
//   const goBackRef = useRef(null);
//   const mainPageRef = useRef(null);

//   useEffect(() => {
//     window.enterWebsite = () => setEnterWebsite(true);
//   }, []);

//   useEffect(() => {
//     if (!start) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [start]);

//   return (
//     <>
//       {!start && <StartScreen onStart={() => setStart(true)} />}

//       {start && !explore && !focusLaptop && (
//         <Hero
//           onExplore={() => setExplore(true)}
//           scrollRef={mainPageRef}
//           onProductsVisible={setProductsVisible}
//         />
//       )}

//       {activeHotspot && !focusLaptop && !enterWebsite && (
//         <HotspotInfo
//           name={activeHotspot.name}
//           cardPosition={activeHotspot.cardPosition}
//           onBack={() => goBackRef.current?.()}
//         />
//       )}

//       <div className="mainPage" ref={mainPageRef}>
//         <div className="canvasWrapper">
//           <Canvas camera={{ position: [50, 36, 45], fov: 40 }}>
//             <CameraController
//               start={start}
//               explore={explore}
//               focusLaptop={focusLaptop}
//             />
//             <ambientLight intensity={0.3} />
//             <directionalLight position={[20, 10, 20]} intensity={1.5} />
//             <Stars
//               radius={80}
//               depth={50}
//               count={100000}
//               factor={4}
//               saturation={0}
//               fade
//               speed={1}
//             />
//             <Environment
//               files="/src/assets/hdr/space.hdr"
//               background
//               backgroundIntensity={0.1}
//               backgroundBlurriness={0.1}
//             />
//             <Laptop
//               explore={explore}
//               focusLaptop={focusLaptop}
//               productsVisible={productsVisible}
//               onLaptopClick={() => {
//                 setFocusLaptop(true);
//                 setActiveHotspot(null);
//               }}
//             />
//             {explore && !focusLaptop && (
//               <Hotspots
//                 setActiveHotspot={setActiveHotspot}
//                 onGoBack={(fn) => (goBackRef.current = fn)}
//                 setFocusLaptop={setFocusLaptop}
//                 setEnterWebsite={setEnterWebsite}
//               />
//             )}
//             {explore && !focusLaptop && !activeHotspot && (
//               <OrbitControls
//                 makeDefault
//                 target={[52, 2, 0]}
//                 enablePan={false}
//                 minDistance={5}
//                 maxDistance={120}
//               />
//             )}
//           </Canvas>
//         </div>
//         <Products onViewDetails={setSelectedProduct} />
//       </div>

//       {selectedProduct && (
//         <ProductDetail
//           product={selectedProduct}
//           onBack={() => setSelectedProduct(null)}
//         />
//       )}

//       {enterWebsite && (
//         <div ref={overlayRef} className="websiteOverlay">
//           <Website scrollerRef={overlayRef} />
//         </div>
//       )}
//     </>
//   );
// }

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

const PRODUCTS = [
  {
    id: 1,
    name: "Apple MacBook Pro",
    price: "$1,999",
    description: "Next-generation performance. M3 chip. All day battery life.",
    model: "/src/assets/models/macbook.glb",
    scale: 3,
  },
  {
    id: 2,
    name: "AirPods Max",
    price: "$549",
    description:
      "High-fidelity audio. Active noise cancellation. All day comfort.",
    model: "/src/assets/models/airpods_max.glb",
    scale: 0.5,
  },
  {
    id: 3,
    name: "Airpods",
    price: "$499",
    description: "Your third product description goes here.",
    model: "/src/assets/models/product.glb",
    scale: 0.5,
  },
  {
    id: 4,
    name: "Apple Watch",
    price: "$699",
    description: "Your third product description goes here.",
    model: "/src/assets/models/watch.glb",
    scale: 0.5,
  },
  {
    id: 5,
    name: "Apple Ipad",
    price: "$799",
    description: "Your third product description goes here.",
    model: "/src/assets/models/ipad.glb",
    scale: 0.5,
  },
  {
    id: 6,
    name: "Apple Iphone",
    price: "$1299",
    description: "Your third product description goes here.",
    model: "/src/assets/models/iphone.glb",
    scale: 0.5,
  },
];

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
              files="/src/assets/hdr/space.hdr"
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
