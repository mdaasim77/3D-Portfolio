
import { Html } from "@react-three/drei";

export default function LaptopScreen({ activeHotspot }) {
  if (!activeHotspot) return null;

  const data = {
    Projects:
      "A collection of my best interactive and production-ready projects.",
    Skills:
      "React, Three.js, GSAP, WebGL and performance-focused development.",
    About:
      "Creative front-end developer building immersive web experiences.",
  };

  return (
    <Html
      transform
      occlude
      distanceFactor={1.1}
      position={[52.2, 2.25, -0.05]}
      rotation={[0, -0.44, 0]}
    >
      <div
        style={{
          width: "1024px",
          height: "640px",
          background: "#111",
          color: "white",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>
          {activeHotspot}
        </h1>

        <p style={{ fontSize: "22px", maxWidth: "700px", lineHeight: "1.6" }}>
          {data[activeHotspot]}
        </p>
      </div>
    </Html>
  );
}