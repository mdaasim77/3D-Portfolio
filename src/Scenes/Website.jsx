// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Website() {
//   const container = useRef();

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // animate every content block safely
//       gsap.utils.toArray(".content").forEach((content) => {
//         gsap.fromTo(
//           content,
//           { opacity: 0, y: 80, scale: 0.95 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 1.4,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: content.closest(".frame"),
//               start: "top 70%",
//               toggleActions: "play none none reverse",
//               markers: true, // remove after testing
//             },
//           },
//         );
//       });

//       ScrollTrigger.refresh();
//     }, container);

//     return () => ctx.revert(); // cleanup (very important)
//   }, []);

//   return (
//     <div ref={container} className="website">
//       <Section
//         title="APPLE LAPTOP"
//         text="Introducing the future of performance."
//       />

//       <Section
//         title="Power. Redefined."
//         text={`Built with the next-generation chip.
// Blazing fast. Incredibly efficient. Unstoppable.`}
//       />

//       <Section
//         title="Smarter than ever."
//         text={`Seamless multitasking.
// Instant responsiveness.
// Machine-level precision.
// It just flows.`}
//       />

//       <Section
//         title="See the extraordinary."
//         text={`Liquid Retina Display.
// Deep blacks. Vibrant colors.
// Every pixel. Perfected.`}
//       />

//       <Section
//         title="Thin. Light. Iconic."
//         text={`Precision-crafted aluminum.
// Feather-light design.
// Engineered to impress.`}
//       />

//       <Section
//         title="All day. And then some."
//         text={`Up to 20 hours of battery life.
// Power that keeps up with you.`}
//       />

//       <Section
//         title="Privacy. Built in."
//         text={`Touch ID.
// Secure architecture.
// Your world. Protected.`}
//       />

//       <Section
//         title="Works like magic."
//         text={`Instant wake.
// Whisper-quiet performance.
// Effortless connectivity.`}
//       />

//       <Section final title="This is the new" text="APPLE LAPTOP" />
//     </div>
//   );
// }

// function Section({ title, text, final }) {
//   return (
//     <section className={`frame ${final ? "finalFrame" : ""}`}>
//       <div className="content">
//         <h1>{title}</h1>
//         <p style={{ whiteSpace: "pre-line" }}>{text}</p>
//       </div>
//     </section>
//   );
// }

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Website({ scrollerRef }) {
  const container = useRef();

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) scroller.scrollTop = value;
        return scroller.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".content").forEach((content) => {
        gsap.fromTo(
          content,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content.closest(".frame"),
              scroller: scroller, // real scroller
              start: "top 70%",
              toggleActions: "play none none reverse",
              markers: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <div ref={container} className="website">
      <Section
        title="APPLE LAPTOP"
        text="Introducing the future of performance."
      />
      <Section
        title="Power. Redefined."
        text={`Built with the next-generation chip.
Blazing fast. Incredibly efficient. Unstoppable.`}
      />
      <Section
        title="Smarter than ever."
        text={`Seamless multitasking.
Instant responsiveness.
Machine-level precision.
It just flows.`}
      />
      <Section
        title="See the extraordinary."
        text={`Liquid Retina Display.
Deep blacks. Vibrant colors.
Every pixel. Perfected.`}
      />
      <Section
        title="Thin. Light. Iconic."
        text={`Precision-crafted aluminum.
Feather-light design.
Engineered to impress.`}
      />
      <Section
        title="All day. And then some."
        text={`Up to 20 hours of battery life.
Power that keeps up with you.`}
      />
      <Section
        title="Privacy. Built in."
        text={`Touch ID.
Secure architecture.
Your world. Protected.`}
      />
      <Section
        title="Works like magic."
        text={`Instant wake.
Whisper-quiet performance.
Effortless connectivity.`}
      />
      <Section final title="This is the new" text="APPLE LAPTOP" />
    </div>
  );
}

function Section({ title, text, final }) {
  return (
    <section className={`frame ${final ? "finalFrame" : ""}`}>
      <div className="content">
        <h1>{title}</h1>
        <p style={{ whiteSpace: "pre-line" }}>{text}</p>
      </div>
    </section>
  );
}
