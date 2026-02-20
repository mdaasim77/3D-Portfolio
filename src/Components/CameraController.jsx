import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start, onComplete }) {
  const { camera } = useThree();

  const lookX = 52;
  const lookY = 2;
  const lookZ = 0;

  // Initial far shot
  useLayoutEffect(() => {
    camera.position.set(10, 5, 80);
    camera.lookAt(lookX, lookY, lookZ);
  }, []);

  useEffect(() => {
    if (!start) return;

    gsap.to(camera.position, {
      x: 50,
      y: 2,
      z: 4,
      duration: 6,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
      onComplete: onComplete, // 🔥 triggers Hero
    });

  }, [start]);

  return null;
}
