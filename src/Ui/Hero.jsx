import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero({ onExplore, scrollRef }) {
  const titleRef = useRef();
  const subRef = useRef();
  const btnRef = useRef();
  const heroRef = useRef();
  const floatAnim = useRef();

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 2.8 },
    );
    gsap.fromTo(
      subRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3.2 },
    );
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
          if (!btnRef.current) return;
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

    // ← Watch the products section appearing
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // products visible → hide hero
          gsap.to(heroRef.current, { opacity: 0, y: -30, duration: 0.5 });
          if (btnRef.current) btnRef.current.style.pointerEvents = "none";
        } else {
          // back to top → show hero
          gsap.to(heroRef.current, { opacity: 1, y: 0, duration: 0.5 });
          if (btnRef.current) btnRef.current.style.pointerEvents = "auto";
        }
      },
      { threshold: 0.1 },
    );

    // observe the products scroll div
    const productsEl = document.querySelector(".productsScroll");
    if (productsEl) observer.observe(productsEl);

    return () => observer.disconnect();
  }, []);

  const handleExplore = () => {
    floatAnim.current?.kill();
    onExplore();
  };

  return (
    <section ref={heroRef} className="hero">
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
