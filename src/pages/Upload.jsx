import axios from "axios";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [volumeUrl, setVolumeUrl] = useState(null);
  const [maskUrl, setMaskUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
        "https://cabgenie-backend.up.railway.app/api/upload_image/",
        formData
      );

      const { volume_url, mask_url, preview_url } = response.data;

      setImageSrc(`${preview_url}?t=${Date.now()}`);
      setVolumeUrl(volume_url);
      setMaskUrl(mask_url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to upload and generate preview.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRender = () => {
  if (volumeUrl && maskUrl) {
    const viewerUrl = `http://localhost:3000/?fileToLoad=${encodeURIComponent(
      volumeUrl
    )}&labelImage=${encodeURIComponent(maskUrl)}`;
    window.open(viewerUrl, "_blank");
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

    {/* 🌐 Optional External Converter Button */}
    <a
      href="https://www.onlineconverter.com/dicom-to-nifti"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-secondary mt-3"
    >
      Don’t have a NIfTI file? Convert DICOM to NIfTI Online →
    </a>

    {/* 🧩 Upload + Render Buttons Side-by-Side */}
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
            Uploading...
          </>
        ) : (
          "Upload and Preview"
        )}
      </button>

      {/* ✅ Render only after preview is available */}
      {imageSrc && volumeUrl && maskUrl && (
        <button className="btn btn-success" onClick={handleRender}>
          Render in ITK VTK Viewer
        </button>
      )}
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
  </div>
);

}
