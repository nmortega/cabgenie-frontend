export default function Home() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "80vh" }}>
      <h1 className="display-4">Welcome to CABGenie</h1>
      <p className="lead">Coronary Artery Segmentation Made Simple.</p>

      <hr className="w-50 my-4" />

      <h5 className="fw-semibold">How to Use</h5>
      <ul className="text-start" style={{ maxWidth: "600px" }}>
        <li>🔍 Prepare your coronary CT image in <strong>.nii.gz</strong> (NIfTI) format.</li>
        <li>📤 Go to the <strong>Upload</strong> page and submit your file.</li>
        <li>🧠 CABGenie will automatically process the image using deep learning.</li>
        <li>📈 A preview will appear, and you can launch the full 3D viewer afterward.</li>
        <li>💡 Need help? Use the DICOM-to-NIfTI converter if your file isn't in NIfTI format.</li>
      </ul>
    </div>
  );
}
