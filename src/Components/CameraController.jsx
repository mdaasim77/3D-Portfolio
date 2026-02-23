import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export default function CameraController({
  start,
  explore,
  focusLaptop,
  onComplete,
}) {
  const { camera } = useThree();

  //  Laptop screen target (ONLY change if laptop moves)
  const lookX = 52;
  const lookY = 2;
  const lookZ = 0;

  //  Initial load → start VERY close to laptop screen

  useLayoutEffect(() => {
    camera.position.set(50, 2, 4);
    camera.lookAt(lookX, lookY, lookZ);
  }, []);

  //  Start clicked → fly OUT to hero position

  useEffect(() => {
    if (!start) return;

    // reset camera before animation (important)
    camera.position.set(50, 2, 4);
    camera.lookAt(lookX, lookY, lookZ);

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

  //  Explore clicked → fly FAR into space

  useEffect(() => {
    if (!explore) return;

    gsap.to(camera.position, {
      x: 0,
      y: 25,
      z: 140,
      duration: 4,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
    });
  }, [explore]);

  //  Laptop clicked → fly BACK to laptop screen

  useEffect(() => {
    if (!focusLaptop) return;

    gsap.to(camera.position, {
      x: 50,
      y: 2,
      z: 4,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
    });
  }, [focusLaptop]);

  return null;
}
