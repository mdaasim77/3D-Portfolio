// export default function HotspotInfo({ name }) {
//   const data = {
//     Projects: "Here you will showcase your best work.",
//     Skills: "React, Three.js, GSAP, WebGL, UI/UX.",
//     About: "Creative front-end developer building immersive experiences.",
//   };

//   return (
//     <div className="hotspotCard">
//       <h2>{name}</h2>
//       <p>{data[name]}</p>
//     </div>
//   );
// }


import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HotspotInfo({ name }) {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [name]);

  const data = {
    Projects:
      "A collection of my best interactive and production-ready projects.",
    Skills:
      "React, Three.js, GSAP, WebGL, UI/UX and performance-focused development.",
    About:
      "Creative front-end developer building immersive web experiences.",
  };

  return (
    <div ref={cardRef} className="hotspotCard">
      <h2>{name}</h2>
      <p>{data[name]}</p>
    </div>
  );
}