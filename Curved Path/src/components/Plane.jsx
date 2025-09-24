import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const FAN_SPEED = 6;

export function PlaneModel(props) {
  const { nodes, materials } = useGLTF("/Models/Plane.glb");
  const fanRef = useRef();

  // Debug: log what's in the model
  console.log("Plane nodes:", nodes);
  console.log("Plane materials:", materials);

  // Debug: Check each node's transform data
  Object.values(nodes).forEach((node, index) => {
    if (node.geometry) {
      console.log(`Node ${index} (${node.name}):`, {
        position: node.position,
        rotation: node.rotation,
        scale: node.scale,
        matrix: node.matrix,
      });
    }
  });

  // Expose the fan reference to parent components
  if (props.onFanRef) {
    props.onFanRef(fanRef);
  }

  // Rotate the fan while preserving its original Blender transform
  useFrame((_state, delta) => {
    if (fanRef.current) {
      // Debug: Log fan position and rotation (only once)
      if (fanRef.current.userData.logged !== true) {
        console.log("Fan position:", fanRef.current.position);
        console.log("Fan rotation:", fanRef.current.rotation);
        fanRef.current.userData.logged = true;
      }

      // Rotate the fan group (not the mesh directly)
      fanRef.current.rotation.x += FAN_SPEED * delta;
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Render each mesh with explicit transforms from GLB */}
      {Object.values(nodes).map((node, index) => {
        // Check if this is the fan mesh
        const isFan = node.name === "PUSHILIN_Plane_Fan";

        return node.geometry ? (
          <group
            key={index}
            ref={isFan ? fanRef : null}
            position={node.position || [0, 0, 0]}
            rotation={node.rotation || [0, 0, 0]}
            scale={node.scale || [1, 1, 1]}
          >
            <mesh
              geometry={node.geometry}
              material={node.material || materials[Object.keys(materials)[0]]}
              name={node.name || `mesh-${index}`}
              userData={{
                originalName: node.name,
                isFan: isFan,
              }}
            />
          </group>
        ) : null;
      })}
    </group>
  );
}

useGLTF.preload("/Models/Plane.glb");
