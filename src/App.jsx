import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import Laptop from "./Components/Laptop";
import StartScreen from "./Ui/StartScreen";

export default function App() {
  return (
    <>
      <StartScreen />
      <Canvas camera={{ position: [0, 5, 20], fov: 35 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[20, 10, 20]} intensity={1.5} />

        {/* Moving star particles = depth */}
        <Stars
          radius={80}
          depth={50}
          count={20000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Environment
          files="/src/assets/hdr/space.hdr"
          background
          backgroundIntensity={0.1}
          backgroundBlurriness={0.1}
        />

        <Laptop scale={0.4} />

        <OrbitControls
          target={[0, 4, 0]}
          enablePan={false}
          minDistance={5}
          maxDistance={25}
        />
      </Canvas>
    </>
  );
}
