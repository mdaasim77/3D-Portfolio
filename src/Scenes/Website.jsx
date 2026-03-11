// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

// gsap.registerPlugin(ScrollTrigger);

// // ========== Product Data ==========
// const products = [
//   {
//     id: 1,
//     name: "Apple MacBook Pro",
//     price: "$1,999",
//     description: "Next-generation performance. M3 chip. All day battery life.",
//     model: "/src/assets/models/macbook.glb",
//   },
//   {
//     id: 2,
//     name: "AirPods Max",
//     price: "$549",
//     description:
//       "High-fidelity audio. Active noise cancellation. All day comfort.",
//     model: "/src/assets/models/airpods_max.glb",
//   },
//   {
//     id: 3,
//     name: "Product Three",
//     price: "$499",
//     description: "Your third product description goes here.",
//     model: "/src/assets/models/product.glb",
//   },
// ];

// // ========== Single Product Model ==========
// function ProductModel({ path }) {
//   const { scene } = useGLTF(path);
//   return <primitive object={scene} scale={0.5} position={[0, 0, 0]} />;
// }

// // ========== Single Product Section ==========
// function ProductSection({ product, index, scrollerRef }) {
//   const overlayRef = useRef();

//   useEffect(() => {
//     const scroller = scrollerRef.current;
//     if (!scroller || !overlayRef.current) return;

//     gsap.fromTo(
//       overlayRef.current,
//       { y: 60, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1.2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: overlayRef.current.closest(".productSection"),
//           scroller: scroller,
//           start: "top 60%",
//           toggleActions: "play none none reverse",
//         },
//       },
//     );
//   }, []);

//   return (
//     <section className="productSection">
//       <div className="productCanvas">
//         <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[5, 5, 5]} intensity={1.2} />
//           <Environment preset="city" />
//           <ProductModel path={product.model} />
//           <OrbitControls
//             enablePan={false}
//             minDistance={2}
//             maxDistance={8}
//             autoRotate
//             autoRotateSpeed={1.5}
//           />
//         </Canvas>
//       </div>

//       <div ref={overlayRef} className="productOverlay">
//         <span className="productNumber">0{index + 1}</span>
//         <h2 className="productName">{product.name}</h2>
//         <p className="productDesc">{product.description}</p>
//         <span className="productPrice">{product.price}</span>
//         <button className="productBtn">View Details</button>
//       </div>
//     </section>
//   );
// }

// // ========== Main Website ==========
// export default function Website({ scrollerRef }) {
//   useEffect(() => {
//     const scroller = scrollerRef.current;
//     if (!scroller) return;

//     ScrollTrigger.scrollerProxy(scroller, {
//       scrollTop(value) {
//         if (arguments.length) scroller.scrollTop = value;
//         return scroller.scrollTop;
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//     });

//     ScrollTrigger.refresh();

//     return () => ScrollTrigger.killAll();
//   }, [scrollerRef]);

//   return (
//     <div className="website">
//       <section className="websiteHero">
//         <h1>Our Products</h1>
//         <p>Scroll to explore</p>
//         <div className="scrollIndicator">↓</div>
//       </section>

//       {products.map((product, index) => (
//         <ProductSection
//           key={product.id}
//           product={product}
//           index={index}
//           scrollerRef={scrollerRef}
//         />
//       ))}
//     </div>
//   );
// }



import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Apple MacBook Pro",
    price: "$1,999",
    description: "Next-generation performance. M3 chip. All day battery life.",
    model: "/src/assets/models/macbook.glb",
  },
  {
    id: 2,
    name: "AirPods Max",
    price: "$549",
    description: "High-fidelity audio. Active noise cancellation. All day comfort.",
    model: "/src/assets/models/airpods_max.glb",
  },
  {
    id: 3,
    name: "Product Three",
    price: "$499",
    description: "Your third product description goes here.",
    model: "/src/assets/models/product.glb",
  },
];

function ProductModel({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={0.5} position={[0, 0, 0]} />;
}

function ProductSection({ product, index, scrollerRef }) {
  const overlayRef = useRef();

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !overlayRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: overlayRef.current.closest(".productSection"),
          scroller: scroller,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="productSection">
      <div className="productCanvas">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment preset="city" />
          <ProductModel path={product.model} />
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Canvas>
      </div>
      <div ref={overlayRef} className="productOverlay">
        <span className="productNumber">0{index + 1}</span>
        <h2 className="productName">{product.name}</h2>
        <p className="productDesc">{product.description}</p>
        <span className="productPrice">{product.price}</span>
        <button className="productBtn">View Details</button>
      </div>
    </section>
  );
}

export default function Website({ scrollerRef }) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) scroller.scrollTop = value;
        return scroller.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.refresh();
    return () => ScrollTrigger.killAll();
  }, [scrollerRef]);

  return (
    <div className="website">
      <section className="websiteHero">
        <h1>Our Products</h1>
        <p>Scroll to explore</p>
        <div className="scrollIndicator">↓</div>
      </section>
      {products.map((product, index) => (
        <ProductSection
          key={product.id}
          product={product}
          index={index}
          scrollerRef={scrollerRef}
        />
      ))}
    </div>
  );
}