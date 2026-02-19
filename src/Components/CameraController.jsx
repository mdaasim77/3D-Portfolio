import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!start) return;

    gsap.to(camera.position, {
      x: 0,
      y: 1.6,
      z: 3,
      duration: 3,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(0, 0, 0),
    });
  }, [start]);

  return null;
}
