// import { useRef, useEffect } from "react";
// import gsap from "gsap";

// export default function HotspotInfo({ name, onBack }) {
//   const btnRef = useRef();

//   useEffect(() => {
//     if (!btnRef.current) return;
//     gsap.fromTo(
//       btnRef.current,
//       { y: 20, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
//     );
//   }, [name]);

//   return (
//     <button ref={btnRef} className="backBtn" onClick={onBack}>
//       ← Back
//     </button>
//   );
// }


import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HotspotInfo({ name, onBack }) {
  const btnRef = useRef();

  useEffect(() => {
    if (!btnRef.current) return;
    gsap.fromTo(
      btnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    );
  }, [name]);

  return (
    <button ref={btnRef} className="backBtn" onClick={onBack}>
      ← Back
    </button>
  );
}