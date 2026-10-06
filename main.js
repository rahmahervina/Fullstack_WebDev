import { index, store, destroy } from "./controller.js";


// Menampilkan data awal
index();


// Menambahkan minimal 2 data baru
store({
    nama: "Yoga Pratama",
    umur: 24,
    alamat: "Jl. Melati No. 11",
    email: "yoga@gmail.com"
});

store({
    nama: "Putri Maharani",
    umur: 22,
    alamat: "Jl. Mawar No. 16",
    email: "putri@gmail.com"
});


// Menampilkan data setelah ditambahkan
console.log("\n=== SETELAH DATA DITAMBAHKAN ===");
index();


// Menghapus salah satu data
destroy("Budi Santoso");


// Menampilkan data setelah dihapus
console.log("\n=== SETELAH DATA DIHAPUS ===");
index();