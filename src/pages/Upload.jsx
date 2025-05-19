import axios from "axios";
import { useRef, useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // Matplotlib preview
  const [isUploading, setIsUploading] = useState(false);
  const viewerRef = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a NIfTI file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload_image/",
        formData,
        { responseType: "blob" } // ✅ Important: get binary PNG data
      );

      const blob = response.data;
      const imageURL = URL.createObjectURL(blob); // ✅ Create image URL from blob
      console.log("Generated Image URL:", imageURL);
      setImageSrc(imageURL); // ✅ Set for display
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload and generate preview.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Upload Coronary CT (NIfTI)</h1>

      <input
        type="file"
        accept=".nii.gz"
        className="form-control mt-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={isUploading || !file}
        >
          {isUploading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Upload and Preview...
            </>
          ) : (
            "Upload and Preview"
          )}
        </button>
      </div>

      {/* ✅ Display prediction preview */}
      {imageSrc && (
        <div className="mt-4">
          <h5>Matplotlib Prediction Preview</h5>
          <img
            src={imageSrc}
            alt="Prediction Preview"
            className="img-fluid"
            style={{
              border: "1px solid #ccc",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      )}

      {/* ✅ Kitware Glance Button */}
      <div className="mt-4">
        <a
          href="http://localhost:5173/viewer" // adjust this to your Glance viewer path
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          View in Kitware Glance
        </a>
      </div>
    </div>
  );
}
