import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import PRODUCTS from "../data/products";

gsap.registerPlugin(ScrollTrigger);

function ProductModel({ path, scale }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
}

function ProductSection({ product, index, scrollerRef }) {
  const overlayRef = useRef();
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !overlayRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: overlayRef.current.closest(".productSection"),
          scroller: scroller,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className="productSection">
      <div className="productCanvas">
        {isVisible && (
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment preset="city" />
            <ProductModel path={product.model} scale={product.scale} />
            <OrbitControls
              enablePan={false}
              minDistance={2}
              maxDistance={8}
              autoRotate
              autoRotateSpeed={1.5}
            />
          </Canvas>
        )}
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
  const curtainRef = useRef();

  useEffect(() => {
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

    ScrollTrigger.refresh();

    setTimeout(() => {
      if (curtainRef.current) {
        gsap.to(curtainRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            if (curtainRef.current) curtainRef.current.style.display = "none";
          },
        });
      }
    }, 600);

    return () => ScrollTrigger.killAll();
  }, [scrollerRef]);

  return (
    <div className="website">
      <div
        ref={curtainRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "black",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <section className="websiteHero">
        <h1>Our Products</h1>
        <p>Scroll to explore</p>
        <div className="scrollIndicator">↓</div>
      </section>
      {PRODUCTS.map((product, index) => (
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
