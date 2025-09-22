import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

function Box(props) {
  return (
    <mesh {...props} rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" metalness={0.4} roughness={0.6} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [3, 2, 4], fov: 60 }}
      shadows
      style={{ height: "100vh", background: "#0c0e13" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

      {/* Objects */}
      <Box position={[0, 0.5, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Helpers */}
      <Stars radius={50} depth={50} count={5000} factor={4} fade />
      <OrbitControls enableDamping dampingFactor={0.07} />
    </Canvas>
  );
}
