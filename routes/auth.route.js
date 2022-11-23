/** panggil express */
const express = require(`express`)

/** buat object utk express */
const app = express()

/** permission to read request user */
app.use(express.urlencoded( {extended:true} ))

/** panggil dulu controller */
const authController = require(`../controllers/auth.controller`)

/** define route utk menampilkan halaman login */
app.get(`/`, authController.showLogin)

/** define route utk proses login */
app.post(`/`, authController.authentication)

// membuat route unutk proses log out
app.get(`/logout`,authController.logout)

/** export object app */
module.exports = app