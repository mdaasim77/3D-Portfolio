import { useRef } from "react";
import gsap from "gsap";

export default function StartScreen({ onStart }) {
  const leftRef = useRef();
  const rightRef = useRef();
  const contentRef = useRef();

 const handleStart = () => {
  // fade intro text first
  gsap.to(contentRef.current, {
    opacity: 0,
    duration: 0.4,
  });

  // doors open
  gsap.to(leftRef.current, {
    x: "-100%",
    duration: 1.6,
    ease: "power4.inOut",
  });

  gsap.to(rightRef.current, {
    x: "100%",
    duration: 1.6,
    ease: "power4.inOut",
    onComplete: onStart, // start scene AFTER doors open
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
