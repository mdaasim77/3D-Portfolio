import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start, explore, focusLaptop }) {
  const { camera } = useThree();

  const lookX = 52;
  const lookY = 2;
  const lookZ = 0;

  // start close to screen
  useLayoutEffect(() => {
    camera.position.set(50, 2, 4);
    camera.lookAt(lookX, lookY, lookZ);
  }, []);

  // Start → hero view
  useEffect(() => {
    if (!start) return;

    camera.position.set(50, 2, 4);
    camera.lookAt(lookX, lookY, lookZ);

    gsap.to(camera.position, {
      x: 10,
      y: 10,
      z: 80,
      duration: 5,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
    });
  }, [start]);

  // Explore → deep space
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

  // Click laptop → zoom to screen → ENTER WEBSITE
  useEffect(() => {
    if (!focusLaptop) return;

    gsap.to(camera.position, {
      x: 50,
      y: 2,
      z: 4,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(lookX, lookY, lookZ),
      onComplete: () => {
        setTimeout(() => window.enterWebsite(), 300);
      },
    });
  }, [focusLaptop]);

  return null;
}
