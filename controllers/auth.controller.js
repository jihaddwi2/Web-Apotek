const apotekerModel = require(`../models/apoteker.model`)
/** load crypt */
const crypt = require(`../crypt`)
const { render } = require("../routes/auth.route")

/** function untk menampilkan halaman logic */
exports.showLogin = async (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function untuk proses authentication */
exports.authentication = async (request, response) => { 
    try {
        /** tampung data username & password */
        let username = request.body.username
        let password = request.body.password

        /** cek username & password */
        let result = await apotekerModel.ambilDataDenganParameter({username:username})

        /** cek keberadaan data aapoteker */
        if(result.length > 0) { 
            /** cek kecocokan password nya  
             * 123 === deskripsi(awdokawodoawkdoawkd) = benar maka login berhasil
             * "===" compare value & tipe data
            */
            if (password === crypt.deskripsi(result[0].password)) {
                /** login berhasil */
                // menyimpan data user ke session
                // `userData` = label of session
                request.session.dataUser = result[0]

                // definisi cart di session
                request.session.cart =[]
                
                return response.redirect(`/obat`)

            } else {
                /** login gagal muncul alert di page */
                return response.redirect(`/login`)
            }
        } else {    
            return response.redirect(`/auth`)
        }
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


// membuat function untuk logout
exports.logout = async (request, response) => {
    try {
        // menghapus data user dari session
        request.session.dataUser = undefined
        
        // kembali ke halaman login
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}