

import { useGLTF } from "@react-three/drei";

export default function Laptop(props) {
  const model = useGLTF("/src/assets/models/laptop.glb");

  return (
    <primitive
      object={model.scene}
      scale={0.4}
      position={[52.2, -2.3, 0]}
      rotation={[0, -0.44, 0]}
      {...props}
    />
  );
}
