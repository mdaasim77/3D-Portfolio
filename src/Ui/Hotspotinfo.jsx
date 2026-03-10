import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HotspotInfo({ name, cardPosition, onBack }) {
  const cardRef = useRef();

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, [name]);

  const data = {
    About: "Creative front-end developer building immersive web experiences.",
    Projects:
      "A collection of my best interactive and production-ready projects.",
    Skills:
      "React, Three.js, GSAP, WebGL, UI/UX and performance-focused development.",
  };

  return (
    <div ref={cardRef} className="hotspotCard" style={cardPosition}>
      <h2 className="cardTitle">{name}</h2>
      <p className="cardText">{data[name]}</p>
      <button className="backBtn" onClick={onBack}>
        ← Back
      </button>
    </div>
  );
}
