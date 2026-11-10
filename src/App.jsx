import { useState } from "react";
import booksData from "./Utils/books.js";
import "./App.css";

function App() {
  const [books, setBooks] = useState(booksData);
  const [halaman, setHalaman] = useState("home");
  const [pencarian, setPencarian] = useState("");
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [bukuDipilih, setBukuDipilih] = useState(null);

  // --- STATE UNTUK GENRE DAN AUTHOR ---
  const [genres, setGenres] = useState([
    { id: 1, name: "Fiksi" },
    { id: 2, name: "Non-Fiksi" },
    { id: 3, name: "Sains" },
    { id: 4, name: "Novel" }
  ]);

  const [authors, setAuthors] = useState([
    { id: 1, name: "Pramoedya Ananta Toer" },
    { id: 2, name: "Andrea Hirata" },
    { id: 3, name: "Tere Liye" }
  ]);

  const [inputGenre, setInputGenre] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");

  const [editGenreId, setEditGenreId] = useState(null);
  const [editGenreName, setEditGenreName] = useState("");

  const [editAuthorId, setEditAuthorId] = useState(null);
  const [editAuthorName, setEditAuthorName] = useState("");

  // --- STATE REGISTRASI PENGGUNA (TUGAS 3) ---
  const [formRegister, setFormRegister] = useState({
    fullname: "",
    email: "",
    username: "",
    password: ""
  });
  const [errorsRegister, setErrorsRegister] = useState({});
  const [registerSukses, setRegisterSukses] = useState(false);

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

  // ==================== FITUR REGISTRASI (TUGAS 3) ====================
  function ubahFormRegister(e) {
    const { name, value } = e.target;
    setFormRegister((prev) => ({ ...prev, [name]: value }));
    if (errorsRegister[name]) {
      setErrorsRegister((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validasiFormRegister() {
    const err = {};
    if (!formRegister.fullname.trim()) err.fullname = "Nama lengkap wajib diisi";
    
    if (!formRegister.email.trim()) {
      err.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formRegister.email)) {
      err.email = "Format email tidak valid (contoh: user@gmail.com)";
    }

    if (!formRegister.username.trim()) {
      err.username = "Username wajib diisi";
    } else if (formRegister.username.length < 4) {
      err.username = "Username minimal 4 karakter";
    }

    if (!formRegister.password) {
      err.password = "Password wajib diisi";
    } else if (formRegister.password.length < 6) {
      err.password = "Password minimal 6 karakter";
    }

    return err;
  }

  function submitRegister(e) {
    e.preventDefault();
    const validationErrors = validasiFormRegister();

    if (Object.keys(validationErrors).length > 0) {
      setErrorsRegister(validationErrors);
      setRegisterSukses(false);
    } else {
      setErrorsRegister({});
      setRegisterSukses(true);
      setFormRegister({ fullname: "", email: "", username: "", password: "" });
    }
  }

  // ==================== FITUR GENRE (CRUD - TUGAS 1 & 2) ====================
  function tambahGenre(e) {
    e.preventDefault();
    if (!inputGenre.trim()) return;
    setGenres((prev) => [...prev, { id: Date.now(), name: inputGenre.trim() }]);
    setInputGenre("");
  }

  function mulaiEditGenre(genre) {
    setEditGenreId(genre.id);
    setEditGenreName(genre.name);
  }

  function simpanEditGenre(e) {
    e.preventDefault();
    if (!editGenreName.trim()) return;
    setGenres((prev) =>
      prev.map((g) => (g.id === editGenreId ? { ...g, name: editGenreName.trim() } : g))
    );
    setEditGenreId(null);
    setEditGenreName("");
  }

  function hapusGenre(id) {
    if (window.confirm("Yakin ingin menghapus genre ini?")) {
      setGenres((prev) => prev.filter((g) => g.id !== id));
    }
  }

  // ==================== FITUR AUTHOR (CRUD - TUGAS 1 & 2) ====================
  function tambahAuthor(e) {
    e.preventDefault();
    if (!inputAuthor.trim()) return;
    setAuthors((prev) => [...prev, { id: Date.now(), name: inputAuthor.trim() }]);
    setInputAuthor("");
  }

  function mulaiEditAuthor(author) {
    setEditAuthorId(author.id);
    setEditAuthorName(author.name);
  }

  function simpanEditAuthor(e) {
    e.preventDefault();
    if (!editAuthorName.trim()) return;
    setAuthors((prev) =>
      prev.map((a) => (a.id === editAuthorId ? { ...a, name: editAuthorName.trim() } : a))
    );
    setEditAuthorId(null);
    setEditAuthorName("");
  }

  function hapusAuthor(id) {
    if (window.confirm("Yakin ingin menghapus author ini?")) {
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    }
  }

  // ==================== HANDLER BUKU ====================
  function ubahForm(e) {
    const { name, value } = e.target;
    setFormBuku((data) => ({ ...data, [name]: value }));
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
    setFormBuku({ title: "", author: "", year: "2026", description: "", image: "" });
    setFormTerbuka(false);
    setPencarian("");
  }

  function hapusBuku(id) {
    if (window.confirm("Yakin ingin menghapus buku ini?")) {
      setBooks((data) => data.filter((book) => book.id !== id));
      if (bukuDipilih?.id === id) setBukuDipilih(null);
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

        <button
          type="button"
          className={halaman === "admin" && !bukuDipilih ? "active" : ""}
          onClick={() => {
            setHalaman("admin");
            setBukuDipilih(null);
          }}
        >
          Admin
        </button>

        <button
          type="button"
          className={halaman === "register" && !bukuDipilih ? "active" : ""}
          onClick={() => {
            setHalaman("register");
            setBukuDipilih(null);
            setRegisterSukses(false);
            setErrorsRegister({});
          }}
        >
          Register
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
                <p><strong>Penulis:</strong> {bukuDipilih.author}</p>
                <p><strong>Tahun terbit:</strong> {bukuDipilih.year}</p>
                <p className="detail-description">{bukuDipilih.description}</p>
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
                <span className="hero-tag">✦ SELAMAT DATANG DI BOOKSALES</span>
                <h2>Satu buku,<br /><span>seribu cerita.</span></h2>
                <p>Temukan buku favoritmu dan mulai perjalanan baru melalui setiap halaman yang kamu baca.</p>
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
                  <p>Temukan bacaan yang cocok untuk menemani harimu.</p>
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
                <p>Ada {books.length} buku yang siap menemani perjalananmu.</p>
              </div>
              <button
                type="button"
                className="primary-button"
                onClick={() => setFormTerbuka(!formTerbuka)}
              >
                {formTerbuka ? "Tutup Form" : "+ Tambah Buku"}
              </button>
            </div>

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

        {/* HALAMAN ADMIN */}
        {!bukuDipilih && halaman === "admin" && (
          <section className="collection-section">
            <div className="section-heading">
              <div>
                <span className="section-label">PANEL ADMIN</span>
                <h2>Kelola Genre & Author</h2>
                <p>Tambah, edit, dan hapus data genre serta author buku.</p>
              </div>
            </div>

            {/* SECTION GENRE */}
            <div className="book-form" style={{ marginBottom: "30px" }}>
              <h3>Genre Buku</h3>

              <form onSubmit={tambahGenre} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Masukkan nama genre baru..."
                  value={inputGenre}
                  onChange={(e) => setInputGenre(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="primary-button">
                  + Tambah Genre
                </button>
              </form>

              <h4>Daftar Genre ({genres.length})</h4>
              <ul style={{ paddingLeft: "0", listStyle: "none", marginTop: "15px" }}>
                {genres.map((genre) => (
                  <li
                    key={genre.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      marginBottom: "8px",
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px solid #eee"
                    }}
                  >
                    {editGenreId === genre.id ? (
                      <form onSubmit={simpanEditGenre} style={{ display: "flex", gap: "10px", width: "100%" }}>
                        <input
                          type="text"
                          value={editGenreName}
                          onChange={(e) => setEditGenreName(e.target.value)}
                          style={{ flex: 1, padding: "6px 10px" }}
                          autoFocus
                        />
                        <button type="submit" className="primary-button" style={{ padding: "6px 12px" }}>
                          Simpan
                        </button>
                        <button
                          type="button"
                          className="delete-button"
                          style={{ padding: "6px 12px" }}
                          onClick={() => setEditGenreId(null)}
                        >
                          Batal
                        </button>
                      </form>
                    ) : (
                      <>
                        <span style={{ fontSize: "1rem", fontWeight: "500" }}>{genre.name}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            type="button"
                            className="detail-button"
                            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                            onClick={() => mulaiEditGenre(genre)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="delete-button"
                            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                            onClick={() => hapusGenre(genre.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* SECTION AUTHOR */}
            <div className="book-form">
              <h3>Author / Penulis Buku</h3>

              <form onSubmit={tambahAuthor} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Masukkan nama author baru..."
                  value={inputAuthor}
                  onChange={(e) => setInputAuthor(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="primary-button">
                  + Tambah Author
                </button>
              </form>

              <h4>Daftar Author ({authors.length})</h4>
              <ul style={{ paddingLeft: "0", listStyle: "none", marginTop: "15px" }}>
                {authors.map((author) => (
                  <li
                    key={author.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      marginBottom: "8px",
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px solid #eee"
                    }}
                  >
                    {editAuthorId === author.id ? (
                      <form onSubmit={simpanEditAuthor} style={{ display: "flex", gap: "10px", width: "100%" }}>
                        <input
                          type="text"
                          value={editAuthorName}
                          onChange={(e) => setEditAuthorName(e.target.value)}
                          style={{ flex: 1, padding: "6px 10px" }}
                          autoFocus
                        />
                        <button type="submit" className="primary-button" style={{ padding: "6px 12px" }}>
                          Simpan
                        </button>
                        <button
                          type="button"
                          className="delete-button"
                          style={{ padding: "6px 12px" }}
                          onClick={() => setEditAuthorId(null)}
                        >
                          Batal
                        </button>
                      </form>
                    ) : (
                      <>
                        <span style={{ fontSize: "1rem", fontWeight: "500" }}>{author.name}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            type="button"
                            className="detail-button"
                            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                            onClick={() => mulaiEditAuthor(author)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="delete-button"
                            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                            onClick={() => hapusAuthor(author.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* HALAMAN REGISTRASI PENGGUNA (TUGAS 3) */}
        {!bukuDipilih && halaman === "register" && (
          <section className="collection-section">
            <div className="section-heading">
              <div>
                <span className="section-label">BERGABUNG DENGAN KAMI</span>
                <h2>Registrasi Akun Baru</h2>
                <p>Buat akun untuk menikmati seluruh fitur BookSales.</p>
              </div>
            </div>

            <div className="book-form" style={{ maxWidth: "500px", margin: "0 auto" }}>
              {registerSukses && (
                <div
                  style={{
                    backgroundColor: "#e8f5e9",
                    color: "#2e7d32",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  🎉 Registrasi berhasil! Selamat bergabung di BookSales.
                </div>
              )}

              <form onSubmit={submitRegister}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="fullname">Nama Lengkap *</label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={formRegister.fullname}
                    onChange={ubahFormRegister}
                    placeholder="Masukkan nama lengkap Anda"
                  />
                  {errorsRegister.fullname && (
                    <span style={{ color: "#d32f2f", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>
                      {errorsRegister.fullname}
                    </span>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={formRegister.email}
                    onChange={ubahFormRegister}
                    placeholder="contoh: user@gmail.com"
                  />
                  {errorsRegister.email && (
                    <span style={{ color: "#d32f2f", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>
                      {errorsRegister.email}
                    </span>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="username">Username *</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formRegister.username}
                    onChange={ubahFormRegister}
                    placeholder="Masukkan username Anda"
                  />
                  {errorsRegister.username && (
                    <span style={{ color: "#d32f2f", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>
                      {errorsRegister.username}
                    </span>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label htmlFor="password">Password *</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formRegister.password}
                    onChange={ubahFormRegister}
                    placeholder="Masukkan password (min. 6 karakter)"
                  />
                  {errorsRegister.password && (
                    <span style={{ color: "#d32f2f", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>
                      {errorsRegister.password}
                    </span>
                  )}
                </div>

                <button type="submit" className="primary-button" style={{ width: "100%" }}>
                  Daftar Sekarang
                </button>
              </form>
            </div>
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