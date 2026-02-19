import { useGLTF } from "@react-three/drei";

export default function Laptop(props) {
  const model = useGLTF("/src/assets/models/laptop.glb");

  return (
    <primitive
      object={model.scene}
      scale={1}
      position={[10, -1.5, 0]}
      rotation={[0, -1.2, 0]} // slight angle toward camera
      {...props}
    />
  );
}
