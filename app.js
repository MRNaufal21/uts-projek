const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// ✅ Tambahkan URL CDN kamu di sini
const CDN_URL = "https://d35u7qce4xrop5.cloudfront.net";

// Konfigurasi koneksi ke RDS
const db = mysql.createConnection({
  host: "uts-db.cp4waw684ukg.ap-southeast-1.rds.amazonaws.com", // Ganti dengan endpoint RDS Anda
  user: "admin",
  password: "deargod21_",
  database: "produk",
});

// Middleware dan template
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.query("SELECT * FROM gambar_produk", (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Database error");
    }

    // Tambahkan domain CDN ke URL gambar
    const produk = results.map(p => ({
      ...p,
      url: `${CDN_URL}/${p.url}`
    }));

    res.render("index", { produk });
  });
});

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
