import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export default function Laptop({ onLaptopClick }) {
  const model = useGLTF("/src/assets/models/laptop.glb");
  const [hovered, setHovered] = useState(false);

  return (
    <primitive
      object={model.scene}
      scale={0.5}
      position={[52.2, -2.3, 0]}
      rotation={[0, -0.44, 0]}
      //  mouse hover detection
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      //  click detection
      onClick={onLaptopClick}
      //  cursor change
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "default")}
    />
  );
}

// =============================================
// try to flaot laptop but fixed position when close
// =============================================

// import { useGLTF } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function Laptop({ onLaptopClick }) {
//   const model = useGLTF("/src/assets/models/laptop.glb");
//   const laptopRef = useRef();

//   // floating animation (runs every frame)
//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();

//     // up / down
//     laptopRef.current.position.y = -2.3 + Math.sin(t) * 0.4;

//     // left / right drift
//     laptopRef.current.position.x = 52.2 + Math.sin(t * 0.5) * 1.2;

//     // slight rotation sway
//     laptopRef.current.rotation.y = -0.44 + Math.sin(t * 0.6) * 0.15;
//     laptopRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
//   });

//   return (
//     <primitive
//       ref={laptopRef}
//       object={model.scene}
//       scale={0.5}
//       position={[52.2, -2.3, 0]}
//       rotation={[0, -0.44, 0]}
//       onClick={onLaptopClick}
//       onPointerEnter={() => (document.body.style.cursor = "pointer")}
//       onPointerLeave={() => (document.body.style.cursor = "default")}
//     />
//   );
// }
