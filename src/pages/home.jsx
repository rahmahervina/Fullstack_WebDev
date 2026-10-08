import { Link } from "react-router-dom";

import saltbread from "../assets/saltbread.jpeg";
import strawberrycake from "../assets/strawberrycake.jpeg";

function Home() {
  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">

            <div className="col-lg-6">
              <p className="text-uppercase fw-semibold mb-3">
                Welcome to Sweet Crumbs
              </p>

              <h1 className="display-3 fw-bold">
                Freshly Baked,
                <br />
                Made With Love.
              </h1>

              <p className="lead my-4">
                Nikmati berbagai pilihan roti, pastry, dan kue
                yang dibuat fresh setiap hari dengan bahan-bahan
                berkualitas.
              </p>

              <a
                href="#products"
                className="btn btn-dark btn-lg px-4"
              >
                Explore Our Bakery
                <i className="bi bi-arrow-down ms-2"></i>
              </a>
            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
                alt="Freshly baked bread"
                className="img-fluid rounded-4 shadow hero-main-image"
              />
            </div>

          </div>
        </div>
      </section>


      {/* =========================
          ABOUT SECTION
      ========================= */}
      <section className="py-5">
        <div className="container py-5">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">
              <div className="about-box">

                <p className="text-uppercase fw-semibold">
                  About Us
                </p>

                <h2 className="display-6 fw-bold mb-4">
                  A Little Bakery
                  <br />
                  With A Big Heart
                </h2>

                <p className="text-muted">
                  Sweet Crumbs adalah bakery yang menghadirkan
                  roti, pastry, dan berbagai macam dessert dengan
                  rasa yang lezat dan tampilan yang menarik.
                </p>

                <p className="text-muted">
                  Kami percaya bahwa makanan yang dibuat dengan
                  cinta dapat membuat hari seseorang menjadi lebih
                  bahagia.
                </p>

                <Link
                  to="/team"
                  className="btn btn-outline-dark rounded-pill px-4 mt-2"
                >
                  Meet Our Team
                </Link>

              </div>
            </div>


            <div className="col-lg-6">

              <div className="about-highlight">

                <div className="row g-3">

                  <div className="col-6">
                    <div className="about-stat">
                      <i className="bi bi-heart-fill"></i>

                      <h5 className="fw-bold mt-3">
                        Made With Love
                      </h5>

                      <p className="text-muted small mb-0">
                        Setiap produk dibuat dengan penuh perhatian.
                      </p>
                    </div>
                  </div>


                  <div className="col-6">
                    <div className="about-stat">
                      <i className="bi bi-stars"></i>

                      <h5 className="fw-bold mt-3">
                        Premium Quality
                      </h5>

                      <p className="text-muted small mb-0">
                        Menggunakan bahan berkualitas terbaik.
                      </p>
                    </div>
                  </div>


                  <div className="col-6">
                    <div className="about-stat">
                      <i className="bi bi-cup-hot-fill"></i>

                      <h5 className="fw-bold mt-3">
                        Fresh Daily
                      </h5>

                      <p className="text-muted small mb-0">
                        Dipanggang fresh setiap hari.
                      </p>
                    </div>
                  </div>


                  <div className="col-6">
                    <div className="about-stat">
                      <i className="bi bi-emoji-smile-fill"></i>

                      <h5 className="fw-bold mt-3">
                        Happy Customers
                      </h5>

                      <p className="text-muted small mb-0">
                        Kebahagiaan pelanggan adalah prioritas kami.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          PRODUCTS SECTION
      ========================= */}
      <section id="products" className="py-5 bg-light">

        <div className="container py-5">

          <div className="text-center mb-5">

            <p className="text-uppercase fw-semibold">
              Our Favorites
            </p>

            <h2 className="display-6 fw-bold">
              Best Seller
            </h2>

            <p className="text-muted">
              Beberapa menu favorit pelanggan Sweet Crumbs.
            </p>

          </div>


          <div className="row g-4">

            {/* Product 1 */}
            <div className="col-md-4">

              <div className="card product-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                <div className="product-image-wrapper">

                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                    className="card-img-top product-img"
                    alt="Butter Croissant"
                  />

                </div>

                <div className="card-body p-4">

                  <span className="product-badge">
                    Best Seller
                  </span>

                  <h5 className="fw-bold mt-3">
                    Butter Croissant
                  </h5>

                  <p className="text-muted">
                    Croissant renyah dengan aroma butter yang
                    menggugah selera.
                  </p>

                  <div className="d-flex justify-content-between align-items-center">

                    <p className="fw-bold mb-0 product-price">
                      Rp25.000
                    </p>

                    <span className="product-rating">
                      <i className="bi bi-star-fill"></i> 4.9
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* Product 2 */}
            <div className="col-md-4">

              <div className="card product-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                <div className="product-image-wrapper">

                  <img
                    src={saltbread}
                    className="card-img-top product-img"
                    alt="Salt Bread"
                  />

                </div>

                <div className="card-body p-4">

                  <span className="product-badge">
                    Customer Favorite
                  </span>

                  <h5 className="fw-bold mt-3">
                    Salt Bread
                  </h5>

                  <p className="text-muted">
                    Wangi butter yang meleleh saat dipanggang
                    dan sentuhan gurih dari sejumput sea salt.
                  </p>

                  <div className="d-flex justify-content-between align-items-center">

                    <p className="fw-bold mb-0 product-price">
                      Rp25.000
                    </p>

                    <span className="product-rating">
                      <i className="bi bi-star-fill"></i> 4.8
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* Product 3 */}
            <div className="col-md-4">

              <div className="card product-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                <div className="product-image-wrapper">

                  <img
                    src={strawberrycake}
                    className="card-img-top product-img"
                    alt="Strawberry Cake"
                  />

                </div>

                <div className="card-body p-4">

                  <span className="product-badge">
                    New Favorite
                  </span>

                  <h5 className="fw-bold mt-3">
                    Strawberry Cake
                  </h5>

                  <p className="text-muted">
                    Perpaduan sponge cake lembut, cream,
                    dan strawberry segar.
                  </p>

                  <div className="d-flex justify-content-between align-items-center">

                    <p className="fw-bold mb-0 product-price">
                      Rp89.999
                    </p>

                    <span className="product-rating">
                      <i className="bi bi-star-fill"></i> 4.9
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          WHY CHOOSE US
      ========================= */}
      <section className="why-us py-5">

        <div className="container py-5">

          <div className="text-center mb-5">

            <p className="text-uppercase fw-semibold">
              Why Sweet Crumbs?
            </p>

            <h2 className="display-6 fw-bold">
              Baked To Make You Smile
            </h2>

          </div>


          <div className="row g-4">

            <div className="col-md-4">

              <div className="why-card text-center p-4">

                <div className="why-icon">
                  <i className="bi bi-basket2-fill"></i>
                </div>

                <h5 className="fw-bold mt-3">
                  Fresh Ingredients
                </h5>

                <p className="text-muted mb-0">
                  Kami menggunakan bahan-bahan pilihan untuk
                  menghasilkan rasa terbaik.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="why-card text-center p-4">

                <div className="why-icon">
                  <i className="bi bi-cake2-fill"></i>
                </div>

                <h5 className="fw-bold mt-3">
                  Freshly Baked
                </h5>

                <p className="text-muted mb-0">
                  Semua produk dibuat dan dipanggang fresh
                  setiap hari.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="why-card text-center p-4">

                <div className="why-icon">
                  <i className="bi bi-heart-fill"></i>
                </div>

                <h5 className="fw-bold mt-3">
                  Made With Love
                </h5>

                <p className="text-muted mb-0">
                  Setiap produk dibuat dengan perhatian dan
                  penuh kasih.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CALL TO ACTION
      ========================= */}
      <section className="home-cta py-5">

        <div className="container py-5 text-center">

          <p className="text-uppercase fw-semibold">
            Sweet Moments Start Here
          </p>

          <h2 className="display-6 fw-bold mb-3">
            Sweeten Your Day With Us 🍰
          </h2>

          <p className="text-muted mb-4">
            Freshly baked treats are waiting for you.
          </p>

          <Link
            to="/contact"
            className="btn btn-dark px-4"
          >
            Contact Us
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>

        </div>

      </section>
    </>
  );
}

export default Home;