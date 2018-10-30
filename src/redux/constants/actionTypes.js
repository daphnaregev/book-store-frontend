const apiCallActionType = baseType => ({
    PENDING: `${baseType}_PENDING`,
    SUCCESS: `${baseType}_SUCCESS`,
    ERROR: `${baseType}_ERROR`,
});

export const BOOKS_API_REQUEST = 'BOOKS_API_REQUEST';

export const GET_BOOKS = apiCallActionType('GET_BOOKS');
export const GET_BOOK = apiCallActionType('GET_BOOK');
export const SAVE_BOOK = apiCallActionType('SAVE_BOOK');
export const UPDATE_BOOK = apiCallActionType('EDIT_BOOK');
export const REMOVE_BOOK = apiCallActionType('REMOVE_BOOK');


