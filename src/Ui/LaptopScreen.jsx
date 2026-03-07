// import { Html } from "@react-three/drei";
// import { useEffect, useState } from "react";

// export default function LaptopScreen({ focusLaptop }) {
//   const [showScreen, setShowScreen] = useState(false);

//   useEffect(() => {
//     if (!focusLaptop) {
//       setShowScreen(false);
//       return;
//     }

//     const timer = setTimeout(() => {
//       setShowScreen(true);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [focusLaptop]);

//   if (!showScreen) return null;

//   return (
//     <Html
//       transform
//       occlude
//       distanceFactor={1.17}
//       position={[52.2, 2.25, -0.05]}
//       rotation={[0, -0.44, 0]}
//     >
//       <div
//         style={{
//           width: "1024px",
//           height: "640px",
//           background: "white",
//           borderRadius: "18px",
//           overflow: "hidden",
//         }}
//       >
//         <h1 style={{ textAlign: "center", marginTop: "40%" }}>My Portfolio</h1>
//       </div>
//     </Html>
//   );
// }


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
      distanceFactor={1.17}
      position={[52.2, 2.25, -0.05]}
      rotation={[0, -0.44, 0]}
    >
      <div
        style={{
          width: "1024px",
          height: "640px",
          background: "white",
          borderRadius: "18px",
          padding: "40px",
          color: "black",
        }}
      >
        <h1>{activeHotspot}</h1>
        <p>{data[activeHotspot]}</p>
      </div>
    </Html>
  );
}