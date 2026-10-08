function Footer() {
  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-5">
            <h4 className="fw-bold mb-3">
              🥐 Sweet Crumbs
            </h4>

            <p className="footer-text mb-0">
              Freshly baked treats made with love.
              <br />
              Bringing sweetness to your everyday moments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3">
              Quick Links
            </h6>

            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/team">Team</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-5">
            <h6 className="fw-bold mb-3">
              Get In Touch
            </h6>

            <p className="footer-text mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>
              Bogor, Indonesia
            </p>

            <p className="footer-text mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              hello@sweetcrumbs.com
            </p>

            <p className="footer-text mb-0">
              <i className="bi bi-telephone-fill me-2"></i>
              +62 812 3456 7890
            </p>
          </div>

        </div>

        <hr className="footer-line my-4" />

        <div className="text-center">
          <p className="footer-text small mb-0">
            © Rahma Hervina ♡
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;