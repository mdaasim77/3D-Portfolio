
import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start, explore, onComplete }) {
  const { camera } = useThree();

  const lookX = 52;
  const lookY = 2;
  const lookZ = 0;

  // initial far shot before clicking start
  useLayoutEffect(() => {
    camera.position.set(10, 5, 80);
    camera.lookAt(lookX, lookY, lookZ);
  }, []);

  // Intro animation → fly to laptop screen
  useEffect(() => {
    if (!start) return;

    gsap.to(camera.position, {
      x: 50,
      y: 2,
      z: 4,
      duration: 6,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
      onComplete: onComplete,
    });

  }, [start]);

  // Explore animation → fly back to space
  useEffect(() => {
    if (!explore) return;

    gsap.to(camera.position, {
      x: 10,
      y: 10,
      z: 80,
      duration: 4,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
    });

  }, [explore]);

  return null;
}
