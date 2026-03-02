// import { Html } from "@react-three/drei";
// import { useThree, useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import gsap from "gsap";

// export default function Hotspots({ setActiveHotspot }) {
//   const { camera } = useThree();

//   const flyToHotspot = (spot) => {
//     const lookTarget = { x: 52, y: 2, z: 0 };

//     const cam = camera;
//     const startFov = cam.fov;

//     const tl = gsap.timeline({
//       defaults: { ease: "power3.inOut" }
//     });

//     // move camera smoothly
//     tl.to(cam.position, {
//       x: spot.camPos[0],
//       y: spot.camPos[1],
//       z: spot.camPos[2],
//       duration: 2,
//       onUpdate: () => cam.lookAt(lookTarget.x, lookTarget.y, lookTarget.z)
//     }, 0);

//     // ⭐ lens zoom (THIS FIXES THE JUMP)
//     tl.to(cam, {
//       fov: 22,
//       duration: 2,
//       onUpdate: () => cam.updateProjectionMatrix()
//     }, 0);

//     tl.call(() => setActiveHotspot(spot.name));
//   };

//   const hotspots = [
//     {
//       name: "Projects",
//       position: [54, 2.5, -4.5],
//       camPos: [54, 3, 3.5],
//     },
//     {
//       name: "Skills",
//       position: [48, -0.8, -7.5],
//       camPos: [48, 1.5, 3.2],
//     },
//     {
//       name: "About",
//       position: [61, 7.5, -1.5],
//       camPos: [56, 5, 5],
//     },
//   ];

//   return hotspots.map((spot, i) => (
//     <Hotspot key={i} spot={spot} flyToHotspot={flyToHotspot} />
//   ));
// }

// function Hotspot({ spot, flyToHotspot }) {
//   const glowRef = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     const scale = 1 + Math.sin(t * 2) * 0.25;
//     const opacity = 0.35 + Math.sin(t * 2) * 0.15;
//     glowRef.current.scale.set(scale, scale, scale);
//     glowRef.current.material.opacity = opacity;
//   });

//   return (
//     <group
//       position={spot.position}
//       onClick={() => flyToHotspot(spot)}
//       onPointerEnter={() => (document.body.style.cursor = "pointer")}
//       onPointerLeave={() => (document.body.style.cursor = "default")}
//     >
//       <mesh ref={glowRef}>
//         <sphereGeometry args={[0.9, 32, 32]} />
//         <meshBasicMaterial color="#00ffff" transparent opacity={0.35} />
//       </mesh>

//       <mesh>
//         <sphereGeometry args={[0.18, 32, 32]} />
//         <meshBasicMaterial color="white" />
//       </mesh>

//       <Html distanceFactor={10}>
//         <div className="hotspotLabel">{spot.name}</div>
//       </Html>
//     </group>
//   );
// }

import { Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";

export default function Hotspots({ setActiveHotspot }) {
  const { camera } = useThree();

  const flyToHotspot = (spot) => {
    const cam = camera;

    const look = {
      x: spot.lookTarget[0],
      y: spot.lookTarget[1],
      z: spot.lookTarget[2],
    };

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // position move
    tl.to(
      cam.position,
      {
        x: spot.camPos[0],
        y: spot.camPos[1],
        z: spot.camPos[2],
        duration: 2,
        onUpdate: () => cam.lookAt(look.x, look.y, look.z),
      },
      0,
    );

    // lens control
    tl.to(
      cam,
      {
        fov: spot.fov,
        duration: 2,
        onUpdate: () => cam.updateProjectionMatrix(),
      },
      0,
    );

    tl.call(() => setActiveHotspot(spot.name));
  };

  const hotspots = [
    // CENTER → full focus
    {
      name: "Projects",
      position: [54, 2.5, -4.5],
      camPos: [56, 4, 4],
      lookTarget: [51, 2, 0], // shift laptop left
      fov: 28,
    },

    // BOTTOM LEFT → leave left space free
    {
      name: "Skills",
      position: [48, -0.8, -7.5],
      camPos: [46, 1.5, 4],
      lookTarget: [54, 2, 0], // shift laptop right
      fov: 28,
    },

    // TOP RIGHT → leave right space free
    {
      name: "About",
      position: [61, 7.5, -1.5],
      camPos: [54, 3, 3.5],
      lookTarget: [52, 2, 0],
      fov: 22,
    },
  ];

  return hotspots.map((spot, i) => (
    <Hotspot key={i} spot={spot} flyToHotspot={flyToHotspot} />
  ));
}

function Hotspot({ spot, flyToHotspot }) {
  const glowRef = useRef();

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
      onClick={() => flyToHotspot(spot)}
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "default")}
    >
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.35} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>

      <Html distanceFactor={10}>
        <div className="hotspotLabel">{spot.name}</div>
      </Html>
    </group>
  );
}
