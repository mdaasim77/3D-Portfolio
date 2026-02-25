import { Html } from "@react-three/drei";

export default function LaptopScreen({ focusLaptop }) {
  // Only show website when camera is focused
  if (!focusLaptop) return null;

  return (
    <Html
      transform
      distanceFactor={1.17}
      position={[52.2, 2.25, -0.05]}
      rotation={[0, -0.44, 0]}
    >
      <div className="screen">
        <h1>My Portfolio</h1>
        <p>This is the website inside the laptop.</p>
      </div>
    </Html>
  );
}
