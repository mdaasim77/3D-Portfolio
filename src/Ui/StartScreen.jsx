export default function StartScreen({ onStart }) {
  return (
    <div className="startScreen">
      <h1>My 3D Portfolio</h1>
      <p>Creative Developer Experience</p>
      <button onClick={onStart}>Start Experience</button>
    </div>
  );
}
