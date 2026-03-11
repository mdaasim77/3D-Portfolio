import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Website({ scrollerRef }) {
  const container = useRef();

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) scroller.scrollTop = value;
        return scroller.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".content").forEach((content) => {
        gsap.fromTo(
          content,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content.closest(".frame"),
              scroller: scroller, // real scroller
              start: "top 70%",
              toggleActions: "play none none reverse",
              markers: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <div ref={container} className="website">
      <Section
        title="APPLE LAPTOP"
        text="Introducing the future of performance."
      />
      <Section
        title="Power. Redefined."
        text={`Built with the next-generation chip.
Blazing fast. Incredibly efficient. Unstoppable.`}
      />
      <Section
        title="Smarter than ever."
        text={`Seamless multitasking.
Instant responsiveness.
Machine-level precision.
It just flows.`}
      />
      <Section
        title="See the extraordinary."
        text={`Liquid Retina Display.
Deep blacks. Vibrant colors.
Every pixel. Perfected.`}
      />
      <Section
        title="Thin. Light. Iconic."
        text={`Precision-crafted aluminum.
Feather-light design.
Engineered to impress.`}
      />
      <Section
        title="All day. And then some."
        text={`Up to 20 hours of battery life.
Power that keeps up with you.`}
      />
      <Section
        title="Privacy. Built in."
        text={`Touch ID.
Secure architecture.
Your world. Protected.`}
      />
      <Section
        title="Works like magic."
        text={`Instant wake.
Whisper-quiet performance.
Effortless connectivity.`}
      />
      <Section final title="This is the new" text="APPLE LAPTOP" />
    </div>
  );
}

function Section({ title, text, final }) {
  return (
    <section className={`frame ${final ? "finalFrame" : ""}`}>
      <div className="content">
        <h1>{title}</h1>
        <p style={{ whiteSpace: "pre-line" }}>{text}</p>
      </div>
    </section>
  );
}

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
