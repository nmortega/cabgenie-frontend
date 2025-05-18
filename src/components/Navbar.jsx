export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2 text-white" href="#">
        <i className="bi bi-heart-fill text-danger"></i>
        CABGenie
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
                <a className="nav-link text-white" href="/">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-white" href="#">About</a>
            </li>
            <li className="nav-item">
                <a className="btn btn-outline-light d-flex align-items-center gap-2" href="/upload">
                <i className="bi bi-upload"></i> Upload
                </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
