const { nanoid } = require('nanoid')
const books = require('./books')


const storeBookListener = (req,h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

    if (name === undefined){
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }

    if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response 
    }

    const id = nanoid(16)
    const finished = (readPage === pageCount)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt}
    books.push(newBook)
    
    const response = h.response({
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {"bookId": id}
    })
    response.code(201)
    // console.log(`books di request POST: ${books}`)
    return response
}

const getAllBooksListener = (req,h) => {
    const {name, reading, finished} = req.query
    if (books.length == 0){
        const response = h.response({
            "status": "success",
            "data": {"books": []}
        })
        response.code(200)
        return response
    }

    let perbukuan = books

    if (reading == 1 || reading == 0) {
        perbukuan = perbukuan.filter((book) => (book.reading == reading))
    }

    if (finished == 1 || finished == 0){
        perbukuan = perbukuan.filter((book) => (book.finished) == finished)
    }

    if (name !== undefined) {
        perbukuan = perbukuan.filter((book) => (book.name.toLowerCase().includes(name.toLowerCase())))
    }
    const tampil = []
    for (let i=0;i<perbukuan.length;i++) {
        const { id, name, publisher} = perbukuan[i]
        const objtampil = {id,name,publisher}
        tampil.push(objtampil)
    }
    const response = h.response({
        "status": "success",
        "data": {"books": tampil}
    })
    response.code(200)
    // console.log(`books di request GET ALL:`)
    // console.log(books)
    return response
}

const getBookDetailListener = (req,h) => {
    const { bookId } = req.params
    // console.log(bookId)
    const book = books.filter((book)=> book.id === bookId)[0]

    if (book === undefined) {
        const response = h.response({
            "status": "fail",
            "message": "Buku tidak ditemukan"
        })
        response.code(404)
        // console.log(`Books di request GET ID (NOT FOUND):`)
        // console.log(books)
        // console.log(book)
        return response
    }

    const response  = h.response({
        "status": "success",
        "data": {"book": book}
    })
    response.code(200)
    // console.log(`Books di request GET ID (FOUND):`)
    // console.log(books)
    // console.log(book)
    return response
}

const editBookListener = (req, h) => {
    const { bookId } = req.params
    const index = books.findIndex((kontol)=>(kontol.id === bookId))
    const updatedAt = new Date().toISOString()
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

    if (index === -1) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        })
        response.code(404)
        return response 
    }

    if (name === undefined){
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }

    if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response 
    }

    books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
    }

    const response = h.response({
        "status": "success",
        "message": "Buku berhasil diperbarui"
    })
    response.code(200)
    return response
}

const deleteBookListener = (req,h) => {
    const { bookId } = req.params
    const index = books.findIndex((book) => (book.id===bookId))

    if (index === -1){
        const response = h.response({
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan"
        })
        response.code(404)
        return response
    }

    books.splice(index,1)
    const response = h.response({
        "status": "success",
        "message": "Buku berhasil dihapus"
    })
    response.code(200)
    return response
}

module.exports = { storeBookListener, getAllBooksListener, getBookDetailListener, editBookListener, deleteBookListener }

