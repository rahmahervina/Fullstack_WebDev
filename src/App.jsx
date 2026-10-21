
import { useState } from "react";
import booksData from "./Utils/books.js";
import "./App.css";

function App() {
  const [books, setBooks] = useState(booksData);
  const [halaman, setHalaman] = useState("home");
  const [pencarian, setPencarian] = useState("");
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [bukuDipilih, setBukuDipilih] = useState(null);

  const [formBuku, setFormBuku] = useState({
    title: "",
    author: "",
    year: "2026",
    description: "",
    image: "",
  });

  const bukuTerfilter = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(pencarian.toLowerCase().trim())
  );

  function ubahForm(e) {
    const { name, value } = e.target;

    setFormBuku((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function tambahBuku(e) {
    e.preventDefault();

    const bukuBaru = {
      id: Date.now(),
      title: formBuku.title.trim(),
      author: formBuku.author.trim(),
      year: Number(formBuku.year),
      description: formBuku.description.trim(),
      image:
        formBuku.image.trim() ||
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    };

    setBooks((data) => [...data, bukuBaru]);

    setFormBuku({
      title: "",
      author: "",
      year: "2026",
      description: "",
      image: "",
    });

    setFormTerbuka(false);
    setPencarian("");
  }

  function hapusBuku(id) {
    const yakin = window.confirm("Yakin ingin menghapus buku ini?");

    if (yakin) {
      setBooks((data) => data.filter((book) => book.id !== id));

      if (bukuDipilih?.id === id) {
        setBukuDipilih(null);
      }
    }
  }

  function tampilkanBuku(book) {
    return (
      <article className="book-card" key={book.id}>
        <div className="book-image">
          <img
            src={book.image}
            alt={book.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://placehold.co/600x400/f9e5ec/536e59?text=BookSales";
            }}
          />
          <span className="book-year">{book.year}</span>
        </div>

        <div className="book-info">
          <p className="book-label">KOLEKSI BUKU</p>

          <h3>{book.title}</h3>

          <p className="book-author">
            <span>Oleh</span> {book.author}
          </p>

          <p className="book-description">{book.description}</p>

          <div className="book-actions">
            <button
              type="button"
              className="detail-button"
              onClick={() => setBukuDipilih(book)}
            >
              Lihat Detail
            </button>

            <button
              type="button"
              className="delete-button"
              onClick={() => hapusBuku(book.id)}
            >
              Hapus Buku
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">🌷</span>
          <h1>BookSales</h1>
        </div>

        <p>Temukan cerita, temukan inspirasi.</p>
      </header>

      <nav className="navbar">
        <button
          type="button"
          className={halaman === "home" && !bukuDipilih ? "active" : ""}
          onClick={() => {
            setHalaman("home");
            setBukuDipilih(null);
          }}
        >
          Home
        </button>

        <button
          type="button"
          className={halaman === "book" && !bukuDipilih ? "active" : ""}
          onClick={() => {
            setHalaman("book");
            setBukuDipilih(null);
            setPencarian("");
          }}
        >
          Koleksi Buku
        </button>
      </nav>

      <main>
        {/* HALAMAN DETAIL BUKU */}
        {bukuDipilih && (
          <section className="detail-page">
            <div className="detail-card">
              <img
                src={bukuDipilih.image}
                alt={bukuDipilih.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/600x400/f9e5ec/536e59?text=BookSales";
                }}
              />

              <div className="detail-content">
                <span className="section-label">DETAIL BUKU</span>

                <h2>{bukuDipilih.title}</h2>

                <p>
                  <strong>Penulis:</strong> {bukuDipilih.author}
                </p>

                <p>
                  <strong>Tahun terbit:</strong> {bukuDipilih.year}
                </p>

                <p className="detail-description">
                  {bukuDipilih.description}
                </p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setBukuDipilih(null)}
                >
                  Kembali ke koleksi
                </button>
              </div>
            </div>
          </section>
        )}

        {/* HALAMAN HOME */}
        {!bukuDipilih && halaman === "home" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="hero-tag">
                  ✦ SELAMAT DATANG DI BOOKSALES
                </span>

                <h2>
                  Satu buku,
                  <br />
                  <span>seribu cerita.</span>
                </h2>

                <p>
                  Temukan buku favoritmu dan mulai perjalanan baru
                  melalui setiap halaman yang kamu baca.
                </p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setHalaman("book")}
                >
                  Jelajahi Koleksi <span>→</span>
                </button>

                <div className="hero-stats">
                  <div>
                    <strong>{books.length}</strong>
                    <span>Buku tersedia</span>
                  </div>

                  <div className="stats-divider"></div>

                  <div>
                    <strong>♡</strong>
                    <span>Untuk pecinta buku</span>
                  </div>
                </div>
              </div>

              <div className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80"
                  alt="Koleksi buku pilihan"
                />

                <div className="floating-note">
                  <span>🌿</span>
                  <div>
                    <strong>Me time terbaik</strong>
                    <p>Dimulai dari sebuah buku</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="collection-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">PILIHAN UNTUKMU</span>
                  <h2>Koleksi Buku</h2>
                  <p>
                    Temukan bacaan yang cocok untuk menemani harimu.
                  </p>
                </div>

                <button
                  type="button"
                  className="text-button"
                  onClick={() => setHalaman("book")}
                >
                  Lihat semua buku →
                </button>
              </div>

              <div className="book-container">
                {books.slice(0, 6).map(tampilkanBuku)}
              </div>
            </section>

            <section className="quote-banner">
              <span>“</span>

              <div>
                <h2>Berikan ruang untuk cerita baru.</h2>
                <p>Satu halaman kecil bisa membuka dunia yang besar.</p>
              </div>

              <span className="quote-flower">🌷</span>
            </section>
          </>
        )}

        {/* HALAMAN KOLEKSI BUKU */}
        {!bukuDipilih && halaman === "book" && (
          <section className="collection-section book-page">
            <div className="section-heading">
              <div>
                <span className="section-label">TEMUKAN BACAANMU</span>
                <h2>Semua Koleksi Buku</h2>
                <p>
                  Ada {books.length} buku yang siap menemani perjalananmu.
                </p>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() => setFormTerbuka(!formTerbuka)}
              >
                {formTerbuka ? "Tutup Form" : "+ Tambah Buku"}
              </button>
            </div>

            {/* FORM TAMBAH BUKU */}
            {formTerbuka && (
              <form className="book-form" onSubmit={tambahBuku}>
                <h3>Tambah Buku Baru 🌷</h3>

                <label htmlFor="title">Judul buku *</label>
                <input
                  id="title"
                  name="title"
                  value={formBuku.title}
                  onChange={ubahForm}
                  placeholder="Masukkan judul buku"
                  required
                />

                <label htmlFor="author">Nama penulis *</label>
                <input
                  id="author"
                  name="author"
                  value={formBuku.author}
                  onChange={ubahForm}
                  placeholder="Masukkan nama penulis"
                  required
                />

                <label htmlFor="year">Tahun terbit *</label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1"
                  max="2100"
                  value={formBuku.year}
                  onChange={ubahForm}
                  required
                />

                <label htmlFor="description">Deskripsi buku *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formBuku.description}
                  onChange={ubahForm}
                  placeholder="Ceritakan sedikit tentang buku ini"
                  rows="3"
                  required
                />

                <label htmlFor="image">URL gambar buku (opsional)</label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formBuku.image}
                  onChange={ubahForm}
                  placeholder="https://..."
                />

                <button className="primary-button" type="submit">
                  Simpan Buku
                </button>
              </form>
            )}

            {/* PENCARIAN BUKU */}
            <div className="search-box">
              <span>🔎</span>

              <input
                type="text"
                placeholder="Cari judul buku atau nama penulis..."
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
              />

              {pencarian && (
                <button
                  type="button"
                  onClick={() => setPencarian("")}
                  aria-label="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            <p className="search-result">
              Menampilkan {bukuTerfilter.length} dari {books.length} buku
            </p>

            {bukuTerfilter.length > 0 ? (
              <div className="book-container">
                {bukuTerfilter.map(tampilkanBuku)}
              </div>
            ) : (
              <p className="empty-message">
                Buku tidak ditemukan. Coba kata kunci lain, ya! 🌷
              </p>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <h3>
          BookSales <span>🌷</span>
        </h3>

        <p>Temukan cerita favoritmu, satu buku dalam satu waktu.</p>

        <p className="copyright">
          © 2026 BookSales · Made with ♡ for book lovers
        </p>
      </footer>
    </div>
  );
}

export default App;
