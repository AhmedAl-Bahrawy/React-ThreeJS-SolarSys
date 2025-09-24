import React, {useRef} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Experience, Background } from "./components";
import "./App.css";

function CameraUpdater({planeRef}) {
  const { camera } = useThree();

  useFrame((_state, delta) => {
    if (planeRef.current) {
      // Example: follow the plane
      camera.position.lerp(
        planeRef.current.position.clone().add({ x: 0, y: 2, z: 10 }),
        0.05
      );
      camera.lookAt(planeRef.current.position);
    }
  });

  return null;
}

function App() {
  const planeRef = useRef();
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 2, 10] }}>
        <CameraUpdater planeRef={planeRef}/>
        <color attach="background" args={["#e6f3ff"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[100, 100, 100]} intensity={1} />
        <Background />
        <Experience ref={planeRef}/>
      </Canvas>
    </div>
  );
}

export default App;
