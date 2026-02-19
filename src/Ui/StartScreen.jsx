import { useRef } from "react";
import gsap from "gsap";

export default function StartScreen({ onStart }) {
  const leftRef = useRef();
  const rightRef = useRef();
  const contentRef = useRef();

  const handleStart = () => {
    // Start 3D scene immediately
    onStart();

    // Fade intro text
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.4,
    });

    // Doors open ON TOP of the scene
    gsap.to(leftRef.current, {
      x: "-100%",
      duration: 1.5,
      ease: "power4.inOut",
    });

    gsap.to(rightRef.current, {
      x: "100%",
      duration: 1.5,
      ease: "power4.inOut",
    });
  };

  return (
    <div className="startWrapper">
      <div ref={leftRef} className="panel leftPanel" />
      <div ref={rightRef} className="panel rightPanel" />

      <div ref={contentRef} className="startContent">
        <h1>My 3D Portfolio</h1>
        <p>Creative Developer Experience</p>
        <button onClick={handleStart}>Start Experience</button>
      </div>
    </div>
  );
}
