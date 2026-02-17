import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <Canvas camera={{ position: [2, 2, 5], fov: 30 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 4, 6]} intensity={1.5} castShadow />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
}