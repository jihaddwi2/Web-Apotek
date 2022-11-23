// fungsi authorization
exports.cekUser = (request, response, next) => {
    // fungsi ini digunkana untuk mengecek data user yang tersimpan di session 
    // jika data nya tersimpan di sesson maka boleh utk mengakses fitur yang di inginkan
    // jika datanya tidak tersimppan di session maka akan di kembalikan ke hlm login

    if(request.session.dataUser === undefined){
        return response.redirect(`/auth`)
    }
    else{
        // lanjut ke fitur uang diinginkan
        next()
    }

}