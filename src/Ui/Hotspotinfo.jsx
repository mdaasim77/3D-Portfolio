export default function HotspotInfo({ name }) {
  const data = {
    Projects: "Here you will showcase your best work.",
    Skills: "React, Three.js, GSAP, WebGL, UI/UX.",
    About: "Creative front-end developer building immersive experiences.",
  };

  return (
    <div className="hotspotCard">
      <h2>{name}</h2>
      <p>{data[name]}</p>
    </div>
  );
}