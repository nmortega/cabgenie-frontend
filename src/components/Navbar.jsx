import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fw-bold d-flex align-items-center gap-2 text-white text-decoration-none"
        >
          <i className="bi bi-heart-fill text-danger"></i>
          CABGenie
        </Link>
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
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-light d-flex align-items-center gap-2"
                to="/upload"
              >
                <i className="bi bi-upload"></i> Upload
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
