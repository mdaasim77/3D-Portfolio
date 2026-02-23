// import { useGLTF } from "@react-three/drei";

// export default function Laptop(props) {
//   const model = useGLTF("/src/assets/models/laptop.glb");

//   return (
//     <primitive
//       object={model.scene}
//       scale={0.5}
//       position={[52.2, -2.3, 0]}
//       rotation={[0, -0.44, 0]}
//       {...props}
//     />
//   );
// }

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
      // 🟢 mouse hover detection
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      // 🟢 click detection
      onClick={onLaptopClick}
      // 🟢 cursor change
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "default")}
    />
  );
}
