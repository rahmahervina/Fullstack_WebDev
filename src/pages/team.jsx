const teamMembers = [
  {
    name: "Rahma Hervina",
    role: "Founder & Creative Director",
    image:
      "src/assets/rahma.jpeg",
    description:
      "Mengembangkan konsep Sweet Crumbs dan memastikan setiap produk dibuat dengan penuh perhatian.",
  },
  {
    name: "Alan",
    role: "Head Baker",
    image:
      "src/assets/alan.jpeg",
    description:
      "Bertanggung jawab menciptakan roti dan pastry fresh dengan rasa yang konsisten.",
  },
  {
    name: "Andini",
    role: "Pastry Chef",
    image:
      "src/assets/andini.jpeg",
    description:
      "Menciptakan berbagai dessert dan pastry dengan tampilan cantik dan rasa yang memorable.",
  },
  {
    name: "Pinaa",
    role: "Customer Experience",
    image:
      "src/assets/pina.jpeg",
    description:
      "Memastikan setiap pelanggan mendapatkan pengalaman terbaik saat berkunjung ke Sweet Crumbs.",
  },
];

function Team() {
  return (
    <>
      {/* Team Header */}
      <section className="team-header py-5">
        <div className="container py-5 text-center">
          <p className="text-uppercase fw-semibold">
            Meet Our Team
          </p>

          <h1 className="display-4 fw-bold">
            The People Behind
            <br />
            Sweet Crumbs
          </h1>

          <p className="lead text-muted mx-auto mt-3">
            Dibalik setiap roti dan pastry yang lezat, ada tim yang
            bekerja dengan passion dan cinta.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-5">
        <div className="container py-4">

          <div className="row g-4 justify-content-center">
            {teamMembers.map((member, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="card team-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                  />

                  <div className="card-body text-center p-4">

                    <h5 className="fw-bold mb-1">
                      {member.name}
                    </h5>

                    <p className="team-role mb-3">
                      {member.role}
                    </p>

                    <p className="text-muted small">
                      {member.description}
                    </p>

                    <div className="team-social mt-4">
                      <a href="#" aria-label="Instagram">
                        <i className="bi bi-instagram"></i>
                      </a>

                      <a href="#" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                      </a>

                      <a href="#" aria-label="Email">
                        <i className="bi bi-envelope-fill"></i>
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Team CTA */}
      <section className="py-5 team-cta">
        <div className="container py-5 text-center">

          <h2 className="fw-bold">
            Baked With Passion, Served With Love 🍰
          </h2>

          <p className="text-muted mt-3">
            Kami selalu berusaha memberikan yang terbaik untuk
            setiap pelanggan Sweet Crumbs.
          </p>

        </div>
      </section>
    </>
  );
}

export default Team;