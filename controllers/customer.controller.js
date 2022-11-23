// panggil model customer
const customerModel = require(`../models/customer.model`)
const { request } = require("../routes/obat.route")

// request => melihat data customer
// respon => menampilkan daa customer melalui view
// 
exports.showDataCustomer = async (request, response) => {
    try {
        //ambil data customer menggunakan model
        let dataCustomer = await customerModel.ambilDataCustomer()
        // passing ke view
        let sendData = {
            page: `customer`,
            data: dataCustomer,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    }
    catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk menampilkan form-customer untk tambah data
exports.showTambahCustomer = async (request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_customer: ``,
            alamat: ``,
            telephone: ``,
            page: `form-customer`,
            targetRoute: `/pelanggan/add`,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data customer baru
exports.prosesTambahData = async (request, response) => {
    try {
        // membaca data dari yg diisikan user
        let newData = {
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telephone: request.body.telephone
        }
        // eksekusi tambah data
        await customerModel.tambahCustomer(newData)

        // redirect ke tampilan data pelanggan
        return response.redirect(`/pelanggan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

//fungsi untuk menapilkan data customer yang akan di ubah
exports.showEditCustomer = async (request, response) => {
    try {
        // mendapatakn id dari customer yang akan di ubah
        let id = request.params.id

        // menampung id ke dalam object
        let parameter = {
            id: id
        }

        // ambil data sesuai parameter
        let customer = await customerModel.ambilDataDenganParameter(parameter)

        // prepare data yang akan di tampilkan pada view
        let sendData = {
            nama_customer: customer[0].nama_customer,
            alamat: customer[0].alamat,
            telephone: customer[0].telephone,
            page: `form-customer`,
            targetRoute: `/pelanggan/edit/${id}`,
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)
        
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data yang diedit
exports.prosesUbahData = async (request, response) => {
    try {
        // mendapatakan id yang diubah
        let id = request.params.id

        // membungkus id ke bentuk object 
        let parameter = {
            id: id
        }

        // menampung perubahan data ke dlm object
        let perubahan = {
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telephone: request.body.telephone
        }

        // eksekusi perubahan data
        await customerModel.ubahCustomer(perubahan, parameter)

        // direct ke tampilan customer
        return response.redirect(`/pelanggan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await customerModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/pelanggan`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}  