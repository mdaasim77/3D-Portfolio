import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Laptop from "./Components/Laptop";

export default function App() {
  return (
    <Canvas camera={{ position: [10, 3, 30], fov: 1 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={2} />

      <Laptop scale={0.01} />

      <OrbitControls />
    </Canvas>
  );
}
