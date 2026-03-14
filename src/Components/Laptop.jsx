import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Laptop({
  onLaptopClick,
  focusLaptop,
  explore,
  productsVisible,
}) {
  const model = useGLTF("/models/laptop.glb");
  const laptopRef = useRef();

  const basePosition = [52.2, -2.3, 0];
  const baseRotation = [0, -0.44, 0];


  useEffect(() => {
    if (!laptopRef.current) return;

    laptopRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); 
        child.material.transparent = true;

        // animate opacity manually
        const targetOpacity = productsVisible ? 0 : 1;
        const startOpacity = child.material.opacity;
        const duration = 30; // frames
        let frame = 0;

        const animate = () => {
          frame++;
          const progress = frame / duration;
          child.material.opacity =
            startOpacity + (targetOpacity - startOpacity) * progress;
          if (frame < duration) requestAnimationFrame(animate);
        };

        animate();
      }
    });
  }, [productsVisible]);

  useFrame((state) => {
    if (!laptopRef.current) return;
    if (explore || focusLaptop) {
      laptopRef.current.position.set(...basePosition);
      laptopRef.current.rotation.set(...baseRotation);
      return;
    }
    const t = state.clock.getElapsedTime();
    laptopRef.current.position.y = basePosition[1] + Math.sin(t) * 0.4;
    laptopRef.current.position.x = basePosition[0] + Math.sin(t * 0.5) * 1.2;
    laptopRef.current.rotation.y = baseRotation[1] + Math.sin(t * 0.6) * 0.15;
    laptopRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
  });

  return (
    <primitive
      ref={laptopRef}
      object={model.scene}
      scale={0.5}
      position={basePosition}
      rotation={baseRotation}
      onClick={onLaptopClick}
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "default")}
    />
  );
}
