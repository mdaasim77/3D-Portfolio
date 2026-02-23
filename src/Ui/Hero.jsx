import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ onExplore }) {
  const titleRef = useRef();
  const subRef = useRef();
  const btnRef = useRef();
  const floatAnim = useRef();

  useEffect(() => {
    // Title drop
    gsap.fromTo(
      titleRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 2.8 },
    );

    // Subtitle fade
    gsap.fromTo(
      subRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3.2 },
    );

    // Button appear
    gsap.fromTo(
      btnRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
        delay: 3.6,
        onComplete: () => {
          // start floating loop AFTER appear animation
          floatAnim.current = gsap.to(btnRef.current, {
            y: "+=15",
            duration: 0.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      },
    );
  }, []);

  const handleExplore = () => {
    // stop floating when clicked
    floatAnim.current?.kill();
    onExplore();
  };

  return (
    <section className="hero">
      <h1 ref={titleRef} className="heroTitle">
        Smart AI Workspace
      </h1>

      <p ref={subRef} className="heroSub">
        Experience productivity in a new dimension. Manage tasks and build
        faster.
      </p>

      <button ref={btnRef} className="heroBtn" onClick={handleExplore}>
        Explore Space
      </button>
    </section>
  );
}
