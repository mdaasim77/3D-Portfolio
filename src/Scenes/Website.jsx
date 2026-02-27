import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Website() {
  const container = useRef();

  useEffect(() => {
    const sections = gsap.utils.toArray(".frame");

    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector(".content"),
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );
    });
  }, []);

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
