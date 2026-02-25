import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Laptop({ onLaptopClick, focusLaptop }) {
  const model = useGLTF("/src/assets/models/laptop.glb");
  const laptopRef = useRef();

  const basePosition = [52.2, -2.3, 0];
  const baseRotation = [0, -0.44, 0];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (focusLaptop) {
      // 🔥 IMPORTANT: force exact alignment
      laptopRef.current.position.set(...basePosition);
      laptopRef.current.rotation.set(...baseRotation);
      return;
    }

    // Floating animation
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
