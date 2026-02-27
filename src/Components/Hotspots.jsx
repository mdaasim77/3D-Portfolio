import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

export default function Hotspots({ setActiveHotspot }) {
  const { camera } = useThree();

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
    <mesh
      key={i}
      position={spot.position}
      onClick={() => {
        setActiveHotspot(spot.name);
        moveCamera(spot.camPos, [52, 2, 0]);
      }}
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "default")}
    >
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshBasicMaterial color="white" />

      <Html distanceFactor={10}>
        <div className="hotspotLabel">{spot.name}</div>
      </Html>
    </mesh>
  ));
}