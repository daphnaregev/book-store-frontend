import {BOOKS_API_REQUEST} from "../constants/actionTypes";

const booksApiMiddleware = store => next => action => {
    if (action.type !== BOOKS_API_REQUEST) {
        return next(action);
    }

    const processResponse = (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    };

    store.dispatch({
        type: action.underlyingType.PENDING,
        payload: action.payload,
    });

    let configs = {};
    configs.method = action.meta.method;
    if (action.meta.body) {
        configs.body = JSON.stringify(action.meta.body);
    }
    configs.headers = {
        'Content-Type': 'application/json'
    };
    return fetch('http://localhost:3001' + action.url, configs)

        .then(processResponse)
        .then(response => {
            store.dispatch({
                type: action.underlyingType.SUCCESS,
                payload: response,
            });
        }).catch(error => {
            error.json().then(response => {
                    store.dispatch({
                        type: action.underlyingType.ERROR,
                        payload: response,
                    });
                }
            )
        });
};

export default booksApiMiddleware;