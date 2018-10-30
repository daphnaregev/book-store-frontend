import * as actionTypes from '../constants/actionTypes';

const initialState = {
    loadingBooks: false,
    removingBook: false,
    savingBook: false,
    updatingBook: false,
    errorMessage: "",
    bookList: [],
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BOOKS.PENDING: {
            let newState = Object.assign({}, state);
            newState.loadingBooks = true;
            newState.errorMessage = '';
            return newState;
        }
        case actionTypes.GET_BOOKS.SUCCESS: {
            let newState = Object.assign({}, state);
            newState.bookList = action.payload;
            newState.errorMessage = '';
            newState.loadingBooks = false;
            return newState;

        }
        case actionTypes.GET_BOOKS.ERROR: {
            let newState = Object.assign({}, state);
            newState.loadingBooks = false;
            newState.bookList = [];
            newState.errorMessage = action.payload.errorMessage;
            return newState;
        }
        case actionTypes.REMOVE_BOOK.PENDING: {
            let newState = Object.assign({}, state);
            newState.errorMessage = '';
            newState.removingBook = true;
            return newState;
        }
        case actionTypes.REMOVE_BOOK.SUCCESS: {
            let newState = Object.assign({}, state);
            let newBookList = Object.assign([], state.bookList);
            newState.removingBook = false;
            newState.errorMessage = '';
            const index = newBookList.findIndex(b => b.id === action.payload);
            if (index !== -1) {
                newBookList.splice(index, 1);
                newState.bookList = newBookList;
            } else {
                newState.errorMessage = 'deleted book id not found';
            }
            return newState;
        }
        case actionTypes.REMOVE_BOOK.ERROR: {
            let newState = Object.assign({}, state);
            newState.removingBook = false;
            newState.errorMessage = action.payload;
            return newState;
        }
        case actionTypes.SAVE_BOOK.PENDING: {
            let newState = Object.assign({}, state);
            newState.savingBook = true;
            newState.errorMessage = '';
            return newState;
        }
        case actionTypes.SAVE_BOOK.SUCCESS: {
            let newState = Object.assign({}, state);
            let newBookList = Object.assign([], state.bookList);
            newState.savingBook = false;
            newState.errorMessage = '';
            newBookList.push(action.payload);
            newState.bookList = newBookList;
            return newState;
        }
        case actionTypes.SAVE_BOOK.ERROR: {
            var newState = Object.assign({}, state);
            newState.savingBook = false;
            newState.errorMessage = action.payload;
            return newState;
        }
        case actionTypes.UPDATE_BOOK.PENDING: {
            let newState = Object.assign({}, state);
            newState.updatingBook = true;
            newState.errorMessage = '';
            return newState;
        }
        case actionTypes.UPDATE_BOOK.SUCCESS: {
            let newState = Object.assign({}, state);
            let newBookList = Object.assign([], state.bookList);
            newState.updatingBook = false;
            newState.errorMessage = '';
            const index = newBookList.findIndex(b => b.id === action.payload.id);
            newBookList[index] = action.payload;
            newState.bookList = newBookList;
            return newState;
        }
        case actionTypes.UPDATE_BOOK.ERROR: {
            let newState = Object.assign({}, state);
            newState.updatingBook = false;
            newState.errorMessage = action.payload;
            return newState;
        }

        default: {
            return state;
        }
    }
};
export default booksReducer;