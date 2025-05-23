export default function About() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">About CABGenie</h1>

      <p>
        Coronary artery disease (CAD) remains one of the leading causes of death worldwide, often requiring surgical intervention such as coronary artery bypass grafting (CABG).
      </p>

      <p>
        CABGenie is an AI-powered web tool designed to assist in the preoperative planning of CABG.
        It uses deep learning models to automatically segment coronary arteries from CT angiography scans.
        This helps streamline surgical planning, reduce variability, and support more precise, data-driven decision-making.
      </p>

      <p>
        The system leverages an advanced semantic segmentation model called <strong>DynUNet</strong> to generate accurate representations of coronary anatomy,
        which can aid clinicians in identifying optimal grafting sites and improving surgical outcomes.
        CABGenie aims to make coronary artery segmentation more accessible, efficient, and clinically valuable.
      </p>
    </div>
  );
}
