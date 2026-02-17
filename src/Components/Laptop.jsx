import { useGLTF } from "@react-three/drei";

export default function Laptop(props) {
  const model = useGLTF("/src/assets/models/laptop.glb");

  return <primitive object={model.scene} {...props} />;
}
