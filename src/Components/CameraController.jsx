import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start }) {
  const { camera } = useThree();

  // 👉 Where the laptop screen is (ONLY change this if laptop moves)
  const lookX = 57;
  const lookY = 2.2;
  const lookZ = 0;

  // Camera starts VERY close to screen
  useLayoutEffect(() => {
    camera.position.set(55, 2, 2);
    camera.lookAt(lookX, lookY, lookZ);
  }, []);

  // When Start clicked → zoom out
  useEffect(() => {
    if (!start) return;

    gsap.to(camera.position, {
      x: -2,
      y: 6,
      z: 18,
      duration: 6,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX + x, lookY, lookZ),
    });
  }, [start]);

  return null;
}
