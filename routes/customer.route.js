// panggil sexpress
const express = require(`express`)

// buat object app
const app = express()

// meminta izin untuk membaca data yang dikirimkan melalui form
app.use(express.urlencoded({extended:true}))

// panggil controller customer
const customerController = require(`../controllers/customer.controller`)

// load authorization from middleware
const authorization = require(`../middleware/authorization`)

// define route utk akcess data customer 
app.get("/", authorization.cekUser ,customerController.showDataCustomer)

// define route utk menampilkan form customer
app.get(`/add`, authorization.cekUser ,customerController.showTambahCustomer)

// define route utk memperoses tambah data customer
app.post(`/add`, authorization.cekUser ,customerController.prosesTambahData)

// difine route untuk nampiline form-customer dengan data yang ingin di ubah
app.get(`/edit/:id`, authorization.cekUser ,customerController.showEditCustomer)

// define route untuk memproses perubahan data
app.post(`/edit/:id`, authorization.cekUser ,customerController.prosesUbahData)

/** create route for process delete obat */
app.get("/delete/:id", authorization.cekUser ,customerController.processDelete)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.post("/delete/:id", authorization.cekUser ,customerController.processDelete)
/** :id -> name of paramter URL */

// export object app
module.exports = app
