
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function ProductModel({ path, scale }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
}

export default function ProductDetail({ product, onBack }) {
  const pageRef = useRef();
  const infoRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" },
    );
    gsap.fromTo(
      infoRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 },
    );
  }, []);

  const handleBack = () => {
    gsap.to(pageRef.current, {
      y: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: onBack,
    });
  };

  return (
    <div ref={pageRef} className="productDetail">
      <button className="productDetailBack" onClick={handleBack}>
        ← Back
      </button>

      <div className="productDetailCanvas">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment preset="city" />
          <ProductModel path={product.model} scale={product.scale} />{" "}
          {/* ← use scale */}
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Canvas>
      </div>

      <div ref={infoRef} className="productDetailInfo">
        <span className="productNumber">0{product.id}</span>
        <h1 className="productDetailName">{product.name}</h1>
        <p className="productDetailDesc">{product.description}</p>
        <span className="productDetailPrice">{product.price}</span>
        <button className="productBtn">Buy Now</button>
      </div>
    </div>
  );
}
