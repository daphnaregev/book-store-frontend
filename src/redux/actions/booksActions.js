import * as actionTypes from '../constants/actionTypes';

const getBooks = () => ({
    type: actionTypes.BOOKS_API_REQUEST,
    url: '/api/books',
    meta: {
        method: 'GET',
    },
    payload: {},
    underlyingType: actionTypes.GET_BOOKS,
});

const removeBook = (bookId) => ({
    type: actionTypes.BOOKS_API_REQUEST,
    url: `/api/books/${bookId}`,
    meta: {
        method: 'DELETE',
    },
    payload: {},
    underlyingType: actionTypes.REMOVE_BOOK,
});

const saveBook = (book) => ({
    type: actionTypes.BOOKS_API_REQUEST,
    url: `/api/books`,
    meta: {
        method: 'POST',
        body: book,
    },
    payload: {},
    underlyingType: actionTypes.SAVE_BOOK,
});

const updateBook = (book) => ({
    type: actionTypes.BOOKS_API_REQUEST,
    url: `/api/books/${book.id}`,
    meta: {
        method: 'PUT',
        body: book,
    },
    payload: {},
    underlyingType: actionTypes.UPDATE_BOOK,
});

const booksActions = {
    getBooks,
    removeBook,
    saveBook,
    updateBook,
};

export default booksActions;