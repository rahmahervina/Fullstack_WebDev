import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import booksData from "./Utils/books.js";
import "./App.css";

// --- KOMPONEN PROTECTED ROUTE (MEMBATASI AKSES ADMIN) ---
function ProtectedAdminRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return (
      <div className="collection-section" style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "#d32f2f" }}>⛔ Akses Ditolak</h2>
        <p>Halaman Admin hanya dapat diakses oleh akun dengan peran <strong>Administrator</strong>.</p>
        <Link to="/" className="primary-button" style={{ display: "inline-block", marginTop: "15px" }}>
          Kembali ke Home
        </Link>
      </div>
    );
  }
  return children;
}

// --- KOMPONEN UTAMA ---
function MainApp() {
  const navigate = useNavigate();
  const [books, setBooks] = useState(booksData);
  const [pencarian, setPencarian] = useState("");
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [bukuDipilih, setBukuDipilih] = useState(null);

  // --- STATE USER / LOGIN (MENGGUNAKAN LOCALSTORAGE) ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userSession");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- STATE GENRE DAN AUTHOR ---
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

  // --- STATE FORM LOGIN ---
  const [loginUsername, setLoginUsername] = useState("");
  const [loginRole, setLoginRole] = useState("user");

  // --- STATE FORM REGISTRASI ---
  const [formRegister, setFormRegister] = useState({ fullname: "", email: "", username: "", password: "" });
  const [errorsRegister, setErrorsRegister] = useState({});
  const [registerSukses, setRegisterSukses] = useState(false);

  const [formBuku, setFormBuku] = useState({ title: "", author: "", year: "2026", description: "", image: "" });

  const bukuTerfilter = books.filter((book) =>
    `${book.title} ${book.author}`.toLowerCase().includes(pencarian.toLowerCase().trim())
  );

  // --- HANDLER LOGIN & LOGOUT ---
  function handleLogin(e) {
    e.preventDefault();
    if (!loginUsername.trim()) return;
    const userData = { username: loginUsername.trim(), role: loginRole };
    setUser(userData);
    localStorage.setItem("userSession", JSON.stringify(userData));
    setLoginUsername("");
    navigate("/");
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("userSession");
    navigate("/");
  }

  // --- HANDLER REGISTRASI ---
  function ubahFormRegister(e) {
    const { name, value } = e.target;
    setFormRegister((prev) => ({ ...prev, [name]: value }));
    if (errorsRegister[name]) setErrorsRegister((prev) => ({ ...prev, [name]: "" }));
  }

  function submitRegister(e) {
    e.preventDefault();
    const err = {};
    if (!formRegister.fullname.trim()) err.fullname = "Nama lengkap wajib diisi";
    if (!formRegister.email.trim()) err.email = "Email wajib diisi";
    if (!formRegister.username.trim()) err.username = "Username wajib diisi";
    if (!formRegister.password || formRegister.password.length < 6) err.password = "Password min. 6 karakter";

    if (Object.keys(err).length > 0) {
      setErrorsRegister(err);
    } else {
      setErrorsRegister({});
      setRegisterSukses(true);
      setFormRegister({ fullname: "", email: "", username: "", password: "" });
    }
  }

  // --- HANDLER GENRE & AUTHOR ---
  function tambahGenre(e) {
    e.preventDefault();
    if (!inputGenre.trim()) return;
    setGenres((prev) => [...prev, { id: Date.now(), name: inputGenre.trim() }]);
    setInputGenre("");
  }

  function hapusGenre(id) {
    if (window.confirm("Yakin hapus genre ini?")) setGenres((prev) => prev.filter((g) => g.id !== id));
  }

  function tambahAuthor(e) {
    e.preventDefault();
    if (!inputAuthor.trim()) return;
    setAuthors((prev) => [...prev, { id: Date.now(), name: inputAuthor.trim() }]);
    setInputAuthor("");
  }

  function hapusAuthor(id) {
    if (window.confirm("Yakin hapus author ini?")) setAuthors((prev) => prev.filter((a) => a.id !== id));
  }

  // --- HANDLER BUKU ---
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
      image: formBuku.image.trim() || "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    };
    setBooks((data) => [...data, bukuBaru]);
    setFormBuku({ title: "", author: "", year: "2026", description: "", image: "" });
    setFormTerbuka(false);
  }

  function hapusBuku(id) {
    if (window.confirm("Yakin hapus buku ini?")) {
      setBooks((data) => data.filter((book) => book.id !== id));
      if (bukuDipilih?.id === id) setBukuDipilih(null);
    }
  }

  function tampilkanBuku(book) {
    return (
      <article className="book-card" key={book.id}>
        <div className="book-image">
          <img src={book.image} alt={book.title} />
          <span className="book-year">{book.year}</span>
        </div>
        <div className="book-info">
          <p className="book-label">KOLEKSI BUKU</p>
          <h3>{book.title}</h3>
          <p className="book-author"><span>Oleh</span> {book.author}</p>
          <p className="book-description">{book.description}</p>
          <div className="book-actions">
            <button type="button" className="detail-button" onClick={() => setBukuDipilih(book)}>
              Lihat Detail
            </button>
            {user?.role === "admin" && (
              <button type="button" className="delete-button" onClick={() => hapusBuku(book.id)}>
                Hapus
              </button>
            )}
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
        
        {/* AKUN LOGIN AKTIF */}
        {user && (
          <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#536e59" }}>
            Halo, <strong>{user.username}</strong> ({user.role === "admin" ? "Administrator" : "User Biasa"}) |{" "}
            <button onClick={handleLogout} style={{ border: "none", background: "none", color: "#d32f2f", cursor: "pointer", textDecoration: "underline" }}>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/koleksi">Koleksi Buku</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : null}
      </nav>

      <main>
        <Routes>
          {/* ROUTE HOME */}
          <Route
            path="/"
            element={
              bukuDipilih ? (
                <section className="detail-page">
                  <div className="detail-card">
                    <img src={bukuDipilih.image} alt={bukuDipilih.title} />
                    <div className="detail-content">
                      <span className="section-label">DETAIL BUKU</span>
                      <h2>{bukuDipilih.title}</h2>
                      <p><strong>Penulis:</strong> {bukuDipilih.author}</p>
                      <p><strong>Tahun:</strong> {bukuDipilih.year}</p>
                      <p>{bukuDipilih.description}</p>
                      <button className="primary-button" onClick={() => setBukuDipilih(null)}>Kembali</button>
                    </div>
                  </div>
                </section>
              ) : (
                <>
                  <section className="hero">
                    <div className="hero-content">
                      <span className="hero-tag">✦ SELAMAT DATANG DI BOOKSALES</span>
                      <h2>Satu buku,<br /><span>seribu cerita.</span></h2>
                      <p>Temukan buku favoritmu dan mulai perjalanan baru.</p>
                      <Link to="/koleksi" className="primary-button" style={{ display: "inline-block" }}>
                        Jelajahi Koleksi →
                      </Link>
                    </div>
                  </section>
                  <section className="collection-section">
                    <h2>Koleksi Buku Pilihan</h2>
                    <div className="book-container">{books.slice(0, 6).map(tampilkanBuku)}</div>
                  </section>
                </>
              )
            }
          />

          {/* ROUTE KOLEKSI BUKU */}
          <Route
            path="/koleksi"
            element={
              <section className="collection-section book-page">
                <div className="section-heading">
                  <div>
                    <span className="section-label">TEMUKAN BACAANMU</span>
                    <h2>Semua Koleksi Buku</h2>
                  </div>
                  {user?.role === "admin" && (
                    <button className="primary-button" onClick={() => setFormTerbuka(!formTerbuka)}>
                      {formTerbuka ? "Tutup Form" : "+ Tambah Buku"}
                    </button>
                  )}
                </div>

                {formTerbuka && user?.role === "admin" && (
                  <form className="book-form" onSubmit={tambahBuku}>
                    <h3>Tambah Buku Baru 🌷</h3>
                    <input name="title" value={formBuku.title} onChange={ubahForm} placeholder="Judul" required />
                    <input name="author" value={formBuku.author} onChange={ubahForm} placeholder="Penulis" required />
                    <input name="year" type="number" value={formBuku.year} onChange={ubahForm} required />
                    <textarea name="description" value={formBuku.description} onChange={ubahForm} placeholder="Deskripsi" required />
                    <button className="primary-button" type="submit">Simpan Buku</button>
                  </form>
                )}

                <div className="search-box">
                  <input type="text" placeholder="Cari buku..." value={pencarian} onChange={(e) => setPencarian(e.target.value)} />
                </div>
                <div className="book-container">{bukuTerfilter.map(tampilkanBuku)}</div>
              </section>
            }
          />

          {/* PROTECTED ROUTE ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute user={user}>
                <section className="collection-section">
                  <h2>Panel Admin - Kelola Genre & Author</h2>
                  <div className="book-form" style={{ marginBottom: "20px" }}>
                    <h3>Genre Buku</h3>
                    <form onSubmit={tambahGenre} style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                      <input value={inputGenre} onChange={(e) => setInputGenre(e.target.value)} placeholder="Genre baru..." />
                      <button className="primary-button" type="submit">+ Tambah</button>
                    </form>
                    <ul>
                      {genres.map((g) => (
                        <li key={g.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                          <span>{g.name}</span>
                          <button className="delete-button" onClick={() => hapusGenre(g.id)}>Hapus</button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="book-form">
                    <h3>Author / Penulis</h3>
                    <form onSubmit={tambahAuthor} style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                      <input value={inputAuthor} onChange={(e) => setInputAuthor(e.target.value)} placeholder="Author baru..." />
                      <button className="primary-button" type="submit">+ Tambah</button>
                    </form>
                    <ul>
                      {authors.map((a) => (
                        <li key={a.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                          <span>{a.name}</span>
                          <button className="delete-button" onClick={() => hapusAuthor(a.id)}>Hapus</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </ProtectedAdminRoute>
            }
          />

          {/* ROUTE LOGIN */}
          <Route
            path="/login"
            element={
              <section className="collection-section">
                <div className="book-form" style={{ maxWidth: "400px", margin: "0 auto" }}>
                  <h2>Login Pengguna</h2>
                  <form onSubmit={handleLogin}>
                    <label>Username</label>
                    <input value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Masukkan username" required />
                    
                    <label>Pilih Peran / Role</label>
                    <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "15px" }}>
                      <option value="user">User Biasa</option>
                      <option value="admin">Administrator</option>
                    </select>

                    <button className="primary-button" type="submit" style={{ width: "100%" }}>Login</button>
                  </form>
                </div>
              </section>
            }
          />

          {/* ROUTE REGISTER */}
          <Route
            path="/register"
            element={
              <section className="collection-section">
                <div className="book-form" style={{ maxWidth: "450px", margin: "0 auto" }}>
                  <h2>Registrasi Akun Baru</h2>
                  {registerSukses && <p style={{ color: "green" }}>🎉 Registrasi berhasil!</p>}
                  <form onSubmit={submitRegister}>
                    <input name="fullname" value={formRegister.fullname} onChange={ubahFormRegister} placeholder="Nama Lengkap" />
                    <input name="email" value={formRegister.email} onChange={ubahFormRegister} placeholder="Email" />
                    <input name="username" value={formRegister.username} onChange={ubahFormRegister} placeholder="Username" />
                    <input name="password" type="password" value={formRegister.password} onChange={ubahFormRegister} placeholder="Password" />
                    <button className="primary-button" type="submit" style={{ width: "100%", marginTop: "10px" }}>Daftar</button>
                  </form>
                </div>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <h3>BookSales <span>🌷</span></h3>
        <p>© 2026 BookSales · Made with ♡ for book lovers</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}