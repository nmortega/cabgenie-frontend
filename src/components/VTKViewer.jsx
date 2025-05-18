import React, { useEffect, useRef } from 'react';
import createViewer from 'itk-vtk-viewer';

export default function VTKViewer({ imageUrl, segmentationUrl }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    const container = viewerRef.current;

    if (container && imageUrl && segmentationUrl) {
      createViewer(container, {
        uiContainer: container,
        image: imageUrl,
        labelImage: segmentationUrl,
        config: {
          use2D: false,
        },
      }).then(viewer => {
        // Example of setting opacity: 0.3 for image, 1.0 for segmentation
        viewer.setImageComponentOpacity(0, 0.3); // base volume
        viewer.setLabelImageComponentOpacity(0, 1.0); // segmentation
      });
    }
  }, [imageUrl, segmentationUrl]);

  return <div ref={viewerRef} style={{ height: '600px', width: '100%' }} />;
}
