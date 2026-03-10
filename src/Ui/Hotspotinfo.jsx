import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HotspotInfo({ name, onBack }) {
  const cardRef = useRef();

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [name]);

  const data = {
    Projects: "A collection of my best interactive and production-ready projects.",
    Skills: "React, Three.js, GSAP, WebGL, UI/UX and performance-focused development.",
    About: "Creative front-end developer building immersive web experiences.",
  };

  return (
    <div ref={cardRef} className="hotspotCard">
      <button className="backBtn" onClick={onBack}>Back</button>
      <h2>{name}</h2>
      <p>{data[name]}</p>
    </div>
  );
}