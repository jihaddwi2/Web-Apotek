// memanggil library crypto-js
const crypto = require(`crypto-js`)

// membuat function untuk enkripsi 
exports.enkripsi = (plainText) => {
    // bikin secreat key
    let secreatKey = `YTTA`

    // proses enkripsi 
    // Advanced Estryprion Standart
    let result = crypto.AES.encrypt(plainText, secreatKey).toString()
    return result
}


// membuat fungsi deskripsi
exports.deskripsi = (chiperText) => {
    // define secreat key
    let secreatKey = `YTTA`

    // proses deskripsi 
    let byte = crypto.AES.decrypt(chiperText, secreatKey)

    let result = byte.toString(crypto.enc.Utf8)

    return result
}