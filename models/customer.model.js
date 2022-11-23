// function untuk CRUD

// load dulu connection dari config
const connection = require(`../config`)

const tableName = `customer`

// function untuk ngambil data customer
exports.ambilDataCustomer = () => {
    return new Promise((resolve, reject) => {
        // bikin query untuk ambil data
        let query = `select * from customer`

        // dijalankan quary nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// function untuk ambil data berdasarkan parameter khusus
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from customer where ${params}`

        // dijalankan quary nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })

    })
}

// function untuk menambah data customer baru
exports.tambahCustomer = (customer) => {
    return new Promise((resolve, reject) => {
        // ambil key dari object customer
        let key = Object
            .keys(customer)
            .join()

        // ambil values dari object customer
        let value = Object
            .keys(customer)
            .map(item => `"${customer[item]}"`)
            .join()
            
        let query = `insert into customer (${key}) values (${value})`

        // dijalankan quary nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })


}

// buat fungsi untuk upadate data customer
exports.ubahCustomer = (data, parameter) => {
    return new Promise((resolve, reject) => {
        // menyusun string untuk query bagain perubahan data
        let preubahanData = Object
        .keys(data)
        .map(item => `${item}="${data[item]}"`)
        .join()

        // menyusun string untuk query bagain peentu data yang akan di ubah
        let params = Object
        .keys(parameter)
        .map(item => `${item}="${parameter[item]}"`)
        .join(` and `)

        // susun query
        let query = `update customer set ${preubahanData} where ${params}`

        // dijalankan quary nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    }) 
}

/** ----------------------------------------------------------------------- 
 * create and export 
 * function to delete data of table */
 exports.delete = (parameter) => {
    return new Promise((resolve, rejected) => {

        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
       
        let query = `delete from ${tableName} where ${params}`

        console.log(`Run: ${query}`)

        connection.query(query, (error, result) => {
            if (error) {
             
                rejected(error.message)
            }

            /** return resolve with data */
            resolve(result)
        })
    })
}