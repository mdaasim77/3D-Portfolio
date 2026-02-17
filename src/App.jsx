import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import Laptop from "./Components/Laptop";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1.8, 8], fov: 5 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />

      {/* Moving star particles = depth */}
      <Stars
        radius={80}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Environment
        files="/src/assets/hdr/space.hdr"
        background
        backgroundIntensity={0.3}
        backgroundBlurriness={0.3}
      />

      <Laptop scale={0.008} />

      <OrbitControls enablePan={false} minDistance={5} maxDistance={25} />
    </Canvas>
  );
}
