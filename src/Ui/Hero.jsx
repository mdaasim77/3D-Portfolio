// import { useRef, useEffect } from "react";
// import gsap from "gsap";

// export default function Hero({ onExplore }) {
//   const titleRef = useRef();
//   const subRef = useRef();
//   const btnRef = useRef();
//   const heroRef = useRef();
//   const floatAnim = useRef();

//   useEffect(() => {
//     // Title drop
//     gsap.fromTo(
//       titleRef.current,
//       { y: -80, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 2.8 },
//     );

//     // Subtitle fade
//     gsap.fromTo(
//       subRef.current,
//       { y: -40, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3.2 },
//     );

//     // Button appear
//     gsap.fromTo(
//       btnRef.current,
//       { y: 80, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1.6,
//         ease: "power3.out",
//         delay: 3.6,
//         onComplete: () => {
//           if (!btnRef.current) return;
//           floatAnim.current = gsap.to(btnRef.current, {
//             y: "+=15",
//             duration: 0.8,
//             ease: "sine.inOut",
//             yoyo: true,
//             repeat: -1,
//           });
//         },
//       },
//     );

//     // ← ADD THIS: hide/show hero on scroll
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         gsap.to(heroRef.current, {
//           opacity: 0,
//           duration: 0.3,
//           pointerEvents: "none",
//         });
//       } else {
//         gsap.to(heroRef.current, {
//           opacity: 1,
//           duration: 0.3,
//           pointerEvents: "auto",
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleExplore = () => {
//     floatAnim.current?.kill();
//     onExplore();
//   };

//   return (
//     <section ref={heroRef} className="hero">
//       {" "}
//       {/* ← add ref here */}
//       <h1 ref={titleRef} className="heroTitle">
//         Smart AI Workspace
//       </h1>
//       <p ref={subRef} className="heroSub">
//         Experience productivity in a new dimension. Manage tasks and build
//         faster.
//       </p>
//       <button ref={btnRef} className="heroBtn" onClick={handleExplore}>
//         Explore Space
//       </button>
//     </section>
//   );
// }


import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero({ onExplore }) {
  const titleRef = useRef();
  const subRef = useRef();
  const btnRef = useRef();
  const heroRef = useRef();
  const floatAnim = useRef();

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 2.8 }
    );
    gsap.fromTo(subRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3.2 }
    );
    gsap.fromTo(btnRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3.6,
        onComplete: () => {
          if (!btnRef.current) return;
          floatAnim.current = gsap.to(btnRef.current, {
            y: "+=15", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1,
          });
        },
      }
    );

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(scrollY / 300, 1);

      gsap.to(heroRef.current, {
        x: `${progress * 60}vw`,
        opacity: 1 - progress,
        duration: 0.1,
        ease: "none",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExplore = () => {
    floatAnim.current?.kill();
    onExplore();
  };

  return (
    <section ref={heroRef} className="hero">
      <h1 ref={titleRef} className="heroTitle">Smart AI Workspace</h1>
      <p ref={subRef} className="heroSub">
        Experience productivity in a new dimension. Manage tasks and build faster.
      </p>
      <button ref={btnRef} className="heroBtn" onClick={handleExplore}>
        Explore Space
      </button>
    </section>
  );
}