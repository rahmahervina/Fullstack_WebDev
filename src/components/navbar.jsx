import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-bakery sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand bakery-brand" to="/">
          <span className="brand-icon">🥐</span>
          <span>Sweet Crumbs</span>
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler bakery-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            {/* Home */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link bakery-link active"
                    : "nav-link bakery-link"
                }
                to="/"
              >
                <i className="bi bi-house-heart me-1"></i>
                Home
              </NavLink>
            </li>

            {/* Team */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link bakery-link active"
                    : "nav-link bakery-link"
                }
                to="/team"
              >
                <i className="bi bi-people me-1"></i>
                Team
              </NavLink>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link bakery-link contact-link active"
                    : "nav-link bakery-link contact-link"
                }
                to="/contact"
              >
                <i className="bi bi-chat-heart me-1"></i>
                Contact
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;