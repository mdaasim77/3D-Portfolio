// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function Hero() {
//   const ref = useRef();

//   useEffect(() => {
//     gsap.fromTo(
//       ref.current,
//       { y: 60, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1.6,
//         ease: "power3.out",
//       },
//     );
//   }, []);

//   return (
//     <section className="hero">
//       <div ref={ref} className="heroLeft">
//         <h1>Smart AI Workspace</h1>
//         <p>
//           Experience productivity in a new dimension. Manage tasks and build
//           faster.
//         </p>
//         <button className="heroBtn">Explore Product</button>
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ onExplore }) {
  const ref = useRef();

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="hero">
      <div ref={ref} className="heroLeft">
        <h1>Smart AI Workspace</h1>
        <p>
          Experience productivity in a new dimension.
          Manage tasks and build faster.
        </p>

        <button className="heroBtn" onClick={onExplore}>
          Explore Space
        </button>
      </div>
    </section>
  );
}
