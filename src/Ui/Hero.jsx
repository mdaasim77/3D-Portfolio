// // import { useEffect, useRef } from "react";
// // import gsap from "gsap";

// // export default function Hero({ onExplore }) {
// //   const ref = useRef();

// //   useEffect(() => {
// //     gsap.fromTo(
// //       ref.current,
// //       { y: 60, opacity: 0 },
// //       {
// //         y: 0,
// //         opacity: 1,
// //         duration: 1.6,
// //         ease: "power3.out",
// //       }
// //     );
// //   }, []);

// //   return (
// //     <section className="hero">
// //       <div ref={ref} className="heroLeft">
// //         <h1>Smart AI Workspace</h1>
// //         <p>
// //           Experience productivity in a new dimension.
// //           Manage tasks and build faster.
// //         </p>

// //         <button className="heroBtn" onClick={onExplore}>
// //           Explore Space
// //         </button>
// //       </div>
// //     </section>
// //   );
// // }

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function Hero({ onExplore }) {
//   const titleRef = useRef();
//   const btnRef = useRef();

//   useEffect(() => {
//     // Title drop animation
//     gsap.fromTo(
//       titleRef.current,
//       { y: -80, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 2.8 },
//     );

//     // Button rise animation
//     gsap.fromTo(
//       btnRef.current,
//       { y: 80, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3 },
//     );
//   }, []);

//   return (
//     <section className="hero">
//       <h1 ref={titleRef} className="heroTitle">
//         Smart AI Workspace
//       </h1>

//       <p className="heroSub">
//         Experience productivity in a new dimension. Manage tasks and build
//         faster.
//       </p>

//       <button ref={btnRef} className="heroBtn" onClick={onExplore}>
//         Explore Space
//       </button>
//     </section>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ onExplore }) {
  const titleRef = useRef();
  const subRef = useRef();
  const btnRef = useRef();

  useEffect(() => {
    // Title drop
    gsap.fromTo(
      titleRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 2.8 },
    );

    // Paragraph fade + slight drop
    gsap.fromTo(
      subRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3.2 },
    );

    // Button rise
    gsap.fromTo(
      btnRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 3.6 },
    );
  }, []);

  return (
    <section className="hero">
      <h1 ref={titleRef} className="heroTitle">
        Smart AI Workspace
      </h1>

      <p ref={subRef} className="heroSub">
        Experience productivity in a new dimension. Manage tasks and build
        faster.
      </p>

      <button ref={btnRef} className="heroBtn" onClick={onExplore}>
        Explore Space
      </button>
    </section>
  );
}
