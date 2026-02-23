import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
export default function CameraController({
  start,
  explore,
  onComplete,
  focusLaptop,
}) {
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
    if (!focusLaptop) return;

    gsap.to(camera.position, {
      x: 50,
      y: 2,
      z: 4, // same as intro position (screen fills browser)
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(52, 2, 0),
    });
  }, [focusLaptop]);

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
