const { storeBookListener, getAllBooksListener,getBookDetailListener, editBookListener, deleteBookListener } = require('./listener')
const h=6

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: storeBookListener
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksListener
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookDetailListener
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookListener
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookListener
    }
]

module.exports = routes