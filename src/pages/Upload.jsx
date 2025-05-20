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
        "https://cabgenie-backend.up.railway.app/api/upload_image/",
        formData, {withCredentials: false,}
      );

      const { preview_url, volume_url, mask_url } = response.data;
      setImageSrc(preview_url);

      // ✅ Generate Kitware Glance URL
      const glanceBase = "http://localhost:9999";
      const url = new URL(glanceBase);
      url.searchParams.append("name", "[CT,Segmentation]");
      url.searchParams.append("url", `[${volume_url},${mask_url}]`);
      setGlanceURL(url.toString());
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to upload and generate preview.");
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

        {imageSrc && (
          <a
            href="http://localhost:9999/viewer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success"
          >
            View in Kitware Glance
          </a>
        )}
      </div>

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
