import { fetcher } from 'react-isomorphic-tools';

export const getBooks = () => async dispatch => {
    const response = await fetcher('/books/own', {
        method: 'GET'
    });

    await dispatch({
        type: 'GET_BOOKS',
        payload: response
    });
};

export const getSortBooks = param => async dispatch => {
    const response = await fetcher(
        `/books/own?sort=book.isCompleted&direction=${param}`,
        {
            method: 'GET'
        }
    );

    dispatch({
        type: 'SORT_BOOKS',
        payload: response
    });
};

export const setIsCompleted = (id, param) => async dispatch => {
    await fetcher(`/books/${id}`, {
        params: {
            bookForm: { isCompleted: param }
        },
        method: 'PATCH'
    });

    dispatch({
        type: 'IS_COMPLETED'
    });
};

export const pushNewBook = book => ({
    type: 'PUSH_NEW_BOOK',
    payload: book
});

export const deleteBookId = id => async dispatch => {
    try {
        await fetcher(`/books/${id}`, {
            method: 'DELETE'
        });

        dispatch({
            type: 'DELETE_BOOK_ID',
            payload: id
        });
    } catch ({ error }) {
        console.log(error);
    }
};