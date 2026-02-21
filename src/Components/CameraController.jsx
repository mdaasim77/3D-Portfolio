import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
// import gsap from "gsap";

export default function CameraController({ start, explore, onComplete }) {
  const { camera } = useThree();

  const lookX = 52;
  const lookY = 2;
  const lookZ = 0;

  // 🔹 BEFORE CLICK → start CLOSE to laptop screen
  useLayoutEffect(() => {
    camera.position.set(50, 2, 4);
    camera.lookAt(lookX, lookY, lookZ);
  }, []);

  // 🔹 Start button → fly OUT to space
  useEffect(() => {
    if (!start) return;

    gsap.to(camera.position, {
      x: 10,
      y: 10,
      z: 80,
      duration: 6,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
      onComplete: onComplete,
    });
  }, [start]);

  // 🔹 Explore button → fly BACK to laptop screen
  useEffect(() => {
    if (!explore) return;

    gsap.to(camera.position, {
      x: 0,
      y: 25,
      z: 140, // 🔥 much further away
      duration: 4,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(52, 2, 0),
    });
  }, [explore]);

  return null;
}
