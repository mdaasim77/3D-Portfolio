import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

export default function CameraController({ start }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(18, 2.5, 0); // look at laptop new position

    if (!start) return;

    gsap.to(camera.position, {
      x: 10,
      y: 6,
      z: 18,
      duration: 5,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(18, 2.5, 0),
    });
  }, [start]);

  return null;
}
