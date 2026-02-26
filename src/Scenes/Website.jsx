import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Website() {
  const container = useRef();

  useEffect(() => {
    // we will add animations here later
  }, []);

  return (
    <div ref={container} className="website" style={{height:"100%"}}>
      <h1>Our 3D Website Product</h1>
    </div>
  );
}
