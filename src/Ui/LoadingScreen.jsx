import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onComplete }) {
  const wrapperRef = useRef();
  const barRef = useRef();
  const percentRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    let progress = 0;

    // animate progress bar
    gsap.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function () {
          progress = Math.round(this.targets()[0].val);
          if (percentRef.current)
            percentRef.current.textContent = `${progress}%`;
          if (barRef.current) barRef.current.style.width = `${progress}%`;
        },
        onComplete: () => {
          // fade out loading screen

          setTimeout(() => {
            gsap.to(wrapperRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.5, // ← increase delay
              onComplete: () => {
                // wait extra before removing so Canvas is ready
                setTimeout(() => onComplete(), 300); // ← extra 300ms
              },
            });
          }, 800); // ← was 0, now 800ms wait after 100%
        },
      },
    );
  }, []);

  return (
    <div ref={wrapperRef} className="loadingScreen">
      {/* logo / title */}
      <div className="loadingContent">
        <div ref={textRef} className="loadingTitle">
          <span className="loadingTitleMain">SMART AI</span>
          <span className="loadingTitleSub">WORKSPACE</span>
        </div>

        {/* progress bar */}
        <div className="loadingBarWrapper">
          <div ref={barRef} className="loadingBar" />
        </div>

        {/* percent */}
        <div ref={percentRef} className="loadingPercent">
          0%
        </div>

        {/* loading text */}
        <p className="loadingText">Initializing 3D Environment...</p>
      </div>

      {/* corner decorations */}
      <div className="loadingCorner loadingCornerTL" />
      <div className="loadingCorner loadingCornerTR" />
      <div className="loadingCorner loadingCornerBL" />
      <div className="loadingCorner loadingCornerBR" />
    </div>
  );
}
