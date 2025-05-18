import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Upload() {
  const [imageSrc, setImageSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const viewerRef = useRef(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload_image/",
        formData,
        {
          responseType: "blob",
        }
      );
      const imageURL = URL.createObjectURL(response.data);
      setImageSrc(imageURL);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleRenderClick = () => {
    setShowViewer(true);
  };

  useEffect(() => {
    if (showViewer && viewerRef.current) {
      if (!viewerRef.current.querySelector("itk-vtk-viewer")) {
        const viewer = document.createElement("itk-vtk-viewer");
        viewer.style.width = "100%";
        viewer.style.height = "600px";
        viewer.setAttribute(
          "data",
          JSON.stringify([
            {
              name: "Volume",
              url: "http://localhost:8000/media/volume.nii.gz", // Change to dynamic URL if needed
              opacity: 0.3,
            },
            {
              name: "Segmentation",
              url: "http://localhost:8000/media/mask.nii.gz", // Change to dynamic URL if needed
              opacity: 1.0,
            },
          ])
        );
        viewerRef.current.appendChild(viewer);
      }
    }
  }, [showViewer]);

  return (
    <div className="container mt-5 text-center">
      <h1>Upload NIfTI File</h1>

      <input
        type="file"
        accept=".nii.gz"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-control mt-3"
      />

      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-primary" onClick={handleUpload}>
          Upload
        </button>

        {imageSrc && (
          <button className="btn btn-secondary" onClick={handleRenderClick}>
            Render in 3D
          </button>
        )}
      </div>

      {imageSrc && (
        <>
          <div className="mt-4">
            <h5>Prediction Overlay</h5>
            <img src={imageSrc} alt="Prediction" className="img-fluid" />
          </div>
        </>
      )}

      {imageSrc && showViewer && <div ref={viewerRef} className="mt-4" />}
    </div>
  );
}
