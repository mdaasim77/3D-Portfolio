import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const ref = useRef();

  useEffect(() => {
    gsap.from(ref.current, {
      y: -120,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 1.2, // wait until zoom nearly done
    });
  }, []);

  return (
    <section className="hero">
      <div ref={ref} className="heroLeft">
        <h1>Smart AI Workspace</h1>
        <p>
          Experience productivity in a new dimension. Manage tasks and build
          faster.
        </p>
        <button className="heroBtn">Explore Product</button>
      </div>
    </section>
  );
}
