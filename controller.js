import users from "./data.js";


// Melihat / menampilkan data
const index = () => {

    console.log("=== DAFTAR DATA USER ===");

    users.map((user, i) => {
        console.log(
            `${i + 1}. ${user.nama} | ${user.umur} tahun | ${user.alamat} | ${user.email}`
        );
    });
};


// Menambah data
const store = (user) => {

    users.push(user);

    console.log("Data berhasil ditambahkan!");
};


// Menghapus data
const destroy = (nama) => {

    const index = users.findIndex(user => user.nama === nama);

    if (index !== -1) {
        users.splice(index, 1);
        console.log("Data berhasil dihapus!");
    } else {
        console.log("Data tidak ditemukan!");
    }
};


export { index, store, destroy };