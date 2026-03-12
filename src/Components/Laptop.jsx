
// import { useGLTF } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function Laptop({ onLaptopClick, focusLaptop, explore }) {
//   const model = useGLTF("/src/assets/models/laptop.glb");
//   const laptopRef = useRef();

//   const basePosition = [52.2, -2.3, 0];
//   const baseRotation = [0, -0.44, 0];

//   useFrame((state) => {
//     // STOP floating when explore starts OR laptop is focused
//     if (explore || focusLaptop) {
//       laptopRef.current.position.set(...basePosition);
//       laptopRef.current.rotation.set(...baseRotation);
//       return;
//     }

//     // floating animation (only during intro)
//     const t = state.clock.getElapsedTime();
//     laptopRef.current.position.y = basePosition[1] + Math.sin(t) * 0.4;
//     laptopRef.current.position.x = basePosition[0] + Math.sin(t * 0.5) * 1.2;
//     laptopRef.current.rotation.y = baseRotation[1] + Math.sin(t * 0.6) * 0.15;
//     laptopRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
//   });

//   return (
//     <primitive
//       ref={laptopRef}
//       object={model.scene}
//       scale={0.5}
//       position={basePosition}
//       rotation={baseRotation}
//       onClick={onLaptopClick}
//       onPointerEnter={() => (document.body.style.cursor = "pointer")}
//       onPointerLeave={() => (document.body.style.cursor = "default")}
//     />
//   );
// }

import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

export default function Laptop({ onLaptopClick, focusLaptop, explore, productsVisible }) {
  const model = useGLTF("/src/assets/models/laptop.glb");
  const laptopRef = useRef();

  const basePosition = [52.2, -2.3, 0];
  const baseRotation = [0, -0.44, 0];

  // ← hide/show laptop when products visible
  useEffect(() => {
    if (!laptopRef.current) return;
    gsap.to(laptopRef.current, {
      opacity: productsVisible ? 0 : 1,
      duration: 0.6,
    });
  }, [productsVisible]);

  useFrame((state) => {
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