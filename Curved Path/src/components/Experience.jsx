import { OrbitControls, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { PlaneModel, CloudModel, generateCloudPositions } from "./index";
import { forwardRef } from "react";


export const Experience = forwardRef((props, planeRef) => {
    const cloudData = generateCloudPositions();
  useFrame((_state, delta) => {
    planeRef.current.position.z -= 5 * delta;
  });
  return (
    <>
      
      <OrbitControls />
      <Float floatIntensity={2} speed={2} />
      <PlaneModel
        scale={[2, 2, 2]}
        rotation-y={Math.PI / 2}
        ref={planeRef}
      />
      {cloudData.map((cloud, index) => (
        <CloudModel
          key={index}
          position={cloud.position}
          scale={[cloud.scale, cloud.scale, cloud.scale]}
          rotation={cloud.rotation}
        />
      ))}
    </>
  );
});
