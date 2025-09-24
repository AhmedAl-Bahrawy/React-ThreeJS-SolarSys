export const generateCloudPositions = () => {
  const clouds = [];
  // const cloudCount = 15; // Total clouds across all layers
  const minDistance = 6; // Minimum distance between clouds
  const maxAttempts = 50; // Prevent infinite loops

  // Define cloud layers (different heights for depth)
  const layers = [
    { height: 3, count: 5, spread: 18, sizeRange: [0.8, 1.2] }, // Low clouds
    { height: 6, count: 5, spread: 22, sizeRange: [1.0, 1.5] }, // Mid clouds
    { height: 9, count: 5, spread: 26, sizeRange: [1.2, 1.8] }, // High clouds
  ];

  layers.forEach((layer, layerIndex) => {
    for (let i = 0; i < layer.count; i++) {
      let attempts = 0;
      let position;
      let validPosition = false;

      // Try to find a valid position that doesn't overlap
      while (attempts < maxAttempts && !validPosition) {
        // Use polar coordinates for better distribution
        const angle = Math.random() * Math.PI * 2 + (layerIndex * Math.PI) / 3;
        const distance =
          Math.random() * layer.spread * 0.6 + layer.spread * 0.4;
        const heightVariation = (Math.random() - 0.5) * 1.5;

        position = [
          Math.cos(angle) * distance,
          layer.height + heightVariation,
          Math.sin(angle) * distance,
        ];

        // Check if position is far enough from existing clouds
        validPosition = clouds.every((cloud) => {
          const dx = position[0] - cloud.position[0];
          const dy = position[1] - cloud.position[1];
          const dz = position[2] - cloud.position[2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          return distance >= minDistance;
        });

        attempts++;
      }

      if (validPosition || attempts >= maxAttempts) {
        const scale =
          Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) +
          layer.sizeRange[0];
        clouds.push({
          position: position || [
            (Math.random() - 0.5) * layer.spread,
            layer.height,
            (Math.random() - 0.5) * layer.spread,
          ],
          scale: scale,
          rotation: [0, Math.random() * Math.PI * 2, 0],
          layer: layerIndex,
        });
      }
    }
  });

  return clouds;
};
