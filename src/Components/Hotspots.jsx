// import { Html } from "@react-three/drei";
// import { useThree, useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import gsap from "gsap";

// export default function Hotspots({ setActiveHotspot }) {
//   const { camera } = useThree();
  
//   const flyToHotspot = (spot) => {
//     const cam = camera;

//     const look = {
//       x: spot.lookTarget[0],
//       y: spot.lookTarget[1],
//       z: spot.lookTarget[2],
//     };

//     const tl = gsap.timeline({
//       defaults: { ease: "power3.inOut" },
//     });

//     tl.to(
//       cam.position,
//       {
//         x: spot.camPos[0],
//         y: spot.camPos[1],
//         z: spot.camPos[2],
//         duration: 2,
//         onUpdate: () => cam.lookAt(look.x, look.y, look.z),
//       },
//       0,
//     );

//     tl.to(
//       cam,
//       {
//         fov: spot.fov,
//         duration: 2,
//         onUpdate: () => cam.updateProjectionMatrix(),
//       },
//       0,
//     );

//     tl.call(() => setActiveHotspot(spot.name));
//   };

//   const hotspots = [
//     {
//       name: "About",
//       position: [61, 7.5, -1.5],
//       camPos: [35, 12, 45],
//       lookTarget: [54, 4, 0],
//       fov: 45,
//     },
//     {
//       name: "Projects",
//       position: [54, 2.5, -4.5],
//       camPos: [30, 8, 25],
//       lookTarget: [52, 2, 0],
//       fov: 35,
//     },
//     {
//       name: "Skills",
//       position: [48, -0.8, -7.5],
//       camPos: [30, 8, 25],
//       lookTarget: [52, 2, 0],
//       fov: 35,
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
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hotspots({ setActiveHotspot, onGoBack }) {
  const { camera } = useThree();

  const goBack = () => {
    gsap.to(camera.position, {
      x: 0,
      y: 25,
      z: 140,
      duration: 2,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(52, 2, 0),
    });
    gsap.to(camera, {
      fov: 40,
      duration: 2,
      onUpdate: () => camera.updateProjectionMatrix(),
    });
    setActiveHotspot(null);
  };

  useEffect(() => {
    onGoBack(goBack);
  }, []);

  const flyToHotspot = (spot) => {
    const look = {
      x: spot.lookTarget[0],
      y: spot.lookTarget[1],
      z: spot.lookTarget[2],
    };

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(camera.position, {
      x: spot.camPos[0],
      y: spot.camPos[1],
      z: spot.camPos[2],
      duration: 2,
      onUpdate: () => camera.lookAt(look.x, look.y, look.z),
    }, 0);

    tl.to(camera, {
      fov: spot.fov,
      duration: 2,
      onUpdate: () => camera.updateProjectionMatrix(),
    }, 0);

    tl.call(() => setActiveHotspot(spot.name));
  };

  const hotspots = [
    {
      name: "About",
      position: [61, 7.5, -1.5],
      camPos: [35, 12, 45],
      lookTarget: [54, 4, 0],
      fov: 45,
    },
    {
      name: "Projects",
      position: [54, 2.5, -4.5],
      camPos: [30, 8, 25],
      lookTarget: [52, 2, 0],
      fov: 35,
    },
    {
      name: "Skills",
      position: [48, -0.8, -7.5],
      camPos: [30, 8, 25],
      lookTarget: [52, 2, 0],
      fov: 35,
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