// panggil si expres 
const express = require(`express`)

// buat object dari express
const app = express()

// ijin membaca data dari request.body
app.use(express.urlencoded({ extended:true }))

// panggil controller nya transaksi
const transaksiController = require(`../controllers/transaksi.controller`)

// panggil midleware initk authorization
const authorization = require(`../middleware/authorization`)

// route untuk menampilkan from transaksi
app.get(`/add`, authorization.cekUser ,transaksiController.showFormTransaksi)

// route untuk menyimpan data transkasi
app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)

// route untuk menampilkan data transaksi nya
app.get(`/`, authorization.cekUser, transaksiController.showTransaksi)

// route untuk menghapus data transaksi
app.get(`/:id`, authorization.cekUser, transaksiController.hapusTransaksi)

// export object app
module.exports = app