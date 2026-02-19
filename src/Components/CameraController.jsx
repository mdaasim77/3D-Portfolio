import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start }) {
  const { camera } = useThree();

  useEffect(() => {
    // IMPORTANT: align camera before animation
    camera.lookAt(0, 2.5, 0);

    if (!start) return;

    gsap.to(camera.position, {
      x: 0,
      y: 2,
      z: 2,
      duration: 5,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(0, 2.5, 0),
    });
  }, [start]);

  return null;
}
