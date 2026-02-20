import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start }) {
  const { camera } = useThree();

  // 👉 Where the laptop screen is (ONLY change this if laptop moves)
  const lookX = 52;
  const lookY =2;
  const lookZ = 0;

  // Camera starts VERY close to screen
  useLayoutEffect(() => {
    camera.position.set(10, 5, 80);
    camera.lookAt(lookX, lookY, lookZ);
  }, []);

  // When Start clicked → zoom out
  useEffect(() => {
    if (!start) return;

    gsap.to(camera.position, {
      x: 50,
      y: 2,
      z: 4,
      duration: 6,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
    });
  }, [start]);

  return null;
}
