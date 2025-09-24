import { useGLTF } from "@react-three/drei";

export function CloudModel(props) {
  const { nodes, materials } = useGLTF("/Models/Cloud.glb");

  // Debug: log what's in the model
  console.log("Cloud nodes:", nodes);
  console.log("Cloud materials:", materials);

  return (
    <group {...props} dispose={null}>
      {nodes.Cloud ? (
        <mesh geometry={nodes.Cloud.geometry} material={materials.Material} />
      ) : (
        // Fallback: try to render any mesh found in the model
        Object.values(nodes).map((node, index) =>
          node.geometry ? (
            <mesh
              key={index}
              geometry={node.geometry}
              material={
                materials.Material || materials[Object.keys(materials)[0]]
              }
            />
          ) : null
        )
      )}
    </group>
  );
}

useGLTF.preload("/Models/Cloud.glb");
