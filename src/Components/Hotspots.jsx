import { Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";

export default function Hotspots({ setActiveHotspot }) {
  const { camera } = useThree();

  // camera animation
  const moveCamera = (pos, look) => {
    gsap.to(camera.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: 2,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(...look),
    });
  };

  const hotspots = [
    {
      name: "Projects",
      position: [54, 2.5, -4.5],
      camPos: [55, 4, 8],
    },
    {
      name: "Skills",
      position: [48, -0.8, -7.5],
      camPos: [48, 3, 8],
    },
    {
      name: "About",
      position: [61, 7.5, -1.5],
      camPos: [52, 6, 10],
    },
  ];

  return hotspots.map((spot, i) => (
    <Hotspot
      key={i}
      spot={spot}
      moveCamera={moveCamera}
      setActiveHotspot={setActiveHotspot}
    />
  ));
}

/* ============ SINGLE HOTSPOT COMPONENT ============ */

function Hotspot({ spot, moveCamera, setActiveHotspot }) {
  const glowRef = useRef();
  const coreRef = useRef();

  // pulsing glow animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2) * 0.25;
    const opacity = 0.35 + Math.sin(t * 2) * 0.15;

    glowRef.current.scale.set(scale, scale, scale);
    glowRef.current.material.opacity = opacity;
  });

  return (
    <group
      position={spot.position}
      onClick={() => {
        setActiveHotspot(spot.name);
        moveCamera(spot.camPos, [52, 2, 0]);
      }}
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "default")}
    >
      {/* GLOW HALO */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* BRIGHT CORE */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* LABEL */}
      <Html distanceFactor={10}>
        <div className="hotspotLabel">{spot.name}</div>
      </Html>
    </group>
  );
}