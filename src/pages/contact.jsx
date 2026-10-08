import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Contact Header */}
      <section className="contact-header py-5">
        <div className="container py-5 text-center">
          <p className="text-uppercase fw-semibold">
            Get In Touch
          </p>

          <h1 className="display-4 fw-bold">
            We'd Love To
            <br />
            Hear From You
          </h1>

          <p className="lead text-muted mx-auto mt-3">
            Punya pertanyaan, ingin melakukan pemesanan, atau sekadar
            ingin menyapa? Hubungi Sweet Crumbs kapan saja.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">

            {/* Contact Information */}
            <div className="col-lg-5">
              <p className="text-uppercase fw-semibold">
                Contact Information
              </p>

              <h2 className="fw-bold mb-4">
                Come & Say Hello 🍰
              </h2>

              <p className="text-muted mb-4">
                Kami siap membantu kamu untuk mendapatkan bakery
                favoritmu. Jangan ragu untuk menghubungi kami!
              </p>

              {/* Address */}
              <div className="contact-info-item d-flex align-items-start mb-4">
                <div className="contact-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Our Bakery
                  </h6>

                  <p className="text-muted mb-0">
                    Jl. Sweet Crumbs No. 25
                    <br />
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-info-item d-flex align-items-start mb-4">
                <div className="contact-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Phone
                  </h6>

                  <p className="text-muted mb-0">
                    +62 812 3456 7890
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-info-item d-flex align-items-start mb-4">
                <div className="contact-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Email
                  </h6>

                  <p className="text-muted mb-0">
                    hello@sweetcrumbs.com
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="contact-info-item d-flex align-items-start">
                <div className="contact-icon">
                  <i className="bi bi-clock-fill"></i>
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Opening Hours
                  </h6>

                  <p className="text-muted mb-0">
                    Monday - Saturday
                    <br />
                    08.00 - 20.00 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="contact-form-card p-4 p-md-5">

                <h3 className="fw-bold mb-4">
                  Send Us A Message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    {/* Name */}
                    <div className="col-md-6">
                      <label
                        htmlFor="name"
                        className="form-label fw-semibold"
                      >
                        Your Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label
                        htmlFor="email"
                        className="form-label fw-semibold"
                      >
                        Email Address
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Subject */}
                    <div className="col-12">
                      <label
                        htmlFor="subject"
                        className="form-label fw-semibold"
                      >
                        Subject
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="What is this about?"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label
                        htmlFor="message"
                        className="form-label fw-semibold"
                      >
                        Message
                      </label>

                      <textarea
                        className="form-control"
                        id="message"
                        rows="6"
                        placeholder="Write your message here..."
                        required
                      ></textarea>
                    </div>

                    {/* Button */}
                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        className="btn btn-dark px-4 py-2"
                      >
                        Send Message
                        <i className="bi bi-send-fill ms-2"></i>
                      </button>

                      {/* Success Message */}
                      {submitted && (
                        <div
                          className="alert alert-success mt-4 mb-0"
                          role="alert"
                        >
                          <i className="bi bi-check-circle-fill me-2"></i>
                          Pesan kamu berhasil dikirim! Terima kasih
                          sudah menghubungi Sweet Crumbs 🍰
                        </div>
                      )}
                    </div>

                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="contact-bottom py-5">
        <div className="container py-4 text-center">

          <h2 className="fw-bold">
            Freshly Baked Just For You 🥐
          </h2>

          <p className="text-muted mt-3">
            See you at Sweet Crumbs!
          </p>

        </div>
      </section>
    </>
  );
}

export default Contact;