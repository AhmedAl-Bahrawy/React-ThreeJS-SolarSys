import React, { useRef, useEffect } from "react";
import { SpotLightHelper, GridHelper, AxesHelper, BoxHelper } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva, useControls } from "leva";

// SpotLight with helper
const SpotLightWithHelper = ({
  position,
  intensity,
  angle,
  penumbra,
  castShadow,
  targetPosition,
}) => {
  const lightRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (lightRef.current) {
      const helper = new SpotLightHelper(lightRef.current, "#20ff00");
      scene.add(helper);

      return () => {
        scene.remove(helper);
        helper.dispose();
      };
    }
  }, [scene]);

  return (
    <spotLight
      ref={lightRef}
      position={position}
      intensity={intensity}
      angle={angle}
      penumbra={penumbra}
      castShadow={castShadow}
      target-position={targetPosition}
    />
  );
};

// Box component
const Box = () => {
  const boxRef = useRef();
  const { scene } = useThree();
  const { color, speed, showHelpers } = useControls({
    color: "#ff6b35",
    speed: {
      value: 0.01,
      min: 0.0,
      max: 0.05,
      step: 0.001,
    },
    showHelpers: true,
  });

  useEffect(() => {
    if (boxRef.current && showHelpers) {
      const helper = new BoxHelper(boxRef.current, "#ff0000");
      scene.add(helper);

      return () => {
        scene.remove(helper);
        helper.dispose();
      };
    }
  }, [scene, showHelpers]);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.y += speed;
    }
  });

  return (
    <mesh ref={boxRef} position={[0, 1, 0]} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
};

// Plane component
const Plane = (props) => {
  const { color } = useControls({
    color: "#2c3e50",
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={props.position}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
    </mesh>
  );
};

const App = () => {
  const { spotIntensity, spotAngle, spotPenumbra, ambientIntensity } =
    useControls({
      spotIntensity: {
        value: 3,
        min: 0,
        max: 10,
        step: 0.1,
      },
      spotAngle: {
        value: Math.PI / 4,
        min: 0,
        max: Math.PI / 2,
        step: 0.01,
      },
      spotPenumbra: {
        value: 0.3,
        min: 0,
        max: 1,
        step: 0.01,
      },
      ambientIntensity: {
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.01,
      },
    });

  return (
    <>
      <Leva
        collapsed={false}
        title="Scene Controls"
        theme={{
          sizes: {
            controlWidth: "320px",
            controlHeight: "25px",
            folderHeight: "30px",
            titleBarHeight: "35px",
          },
          space: {
            sm: "4px",
            md: "6px",
            lg: "8px",
            rowGap: "4px",
            colGap: "6px",
          },
        }}
        flat={true}
        oneLineLabels={true}
        hideTitleBar={false}
      />
      <div id="canvas-container">
        <Canvas
          shadows
          camera={{ position: [8, 6, 8], fov: 50 }}
          gl={{ antialias: true, toneMappingExposure: 1.2 }}
        >
          {/* Grid and axes helpers */}
          <gridHelper args={[20, 20, "#444444", "#666666"]} />
          <axesHelper args={[5]} />

          {/* Lighting setup */}
          <ambientLight intensity={ambientIntensity} />
          <SpotLightWithHelper
            position={[-6, 8, 6]}
            intensity={spotIntensity}
            angle={spotAngle}
            penumbra={spotPenumbra}
            castShadow
            targetPosition={[0, 0, 0]}
          />

          {/* Objects */}
          <Box />
          <Plane position={[0, 0, 0]} />

          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={20}
          />
        </Canvas>
      </div>
    </>
  );
};

export default App;
