import {fetcher} from 'react-isomorphic-tools';
import {getCookie} from './utils/functions'

const changeBookTitle = (bookId, updatedText) => {
    return {
        type: 'CHANGE_BOOK_TITLE',
        bookId,
        updatedText
    };
};

const changeBookAuthor = (bookId, updatedText) => {
    return {
        type: 'CHANGE_BOOK_AUTHOR',
        bookId,
        updatedText
    };
};

const changePageHeader = (bookId, pageNumber, headerId, updatedText) => {
    return {
        type: 'CHANGE_PAGE_HEADER',
        bookId,
        pageNumber,
        headerId,
        updatedText
    };
};

const changePageParagraph = (bookId, pageNumber, paragraphId, updatedText) => {
    return {
        type: 'CHANGE_PAGE_PARAGRAPH',
        bookId,
        pageNumber,
        paragraphId,
        updatedText
    };
};

const copyBookForChanges = book => {
    return {
        type: 'COPY_BOOK',
        book
    };
};

const removeMedia = (bookId, pageNumber, mediaId, mediaOrder) => {
    return {
        type: 'REMOVE_MEDIA',
        bookId,
        pageNumber,
        mediaId,
        mediaOrder
    };
};

const selectMedia = (bookId, pageNumber, media, mediaOrder) => {
    return {
        type: 'SELECT_MEDIA',
        bookId,
        pageNumber,
        media,
        mediaOrder
    };
};

const dndOrder = (dragIndex, hoverIndex, markerElemType, pageNumber) => {
    return {
        type: 'CHANGE_ORDER',
        dragIndex,
        hoverIndex,
        markerElemType,
        pageNumber
    };
};

const createNewPageElement = (newElementType, newElementOrder, page) => {
    return {
        type: 'CREATE_NEW_PAGE_ELEMENT',
        newElementType,
        newElementOrder,
        page
    };
};

const removeHeaderMedia = () => {
    return {
        type: 'REMOVE_HEADER_MEDIA'
    };
};

const selectHeaderMedia = media => {
    return {
        type: 'SELECT_HEADER_MEDIA',
        media
    };
};

const createNewBook = book => {
    return {
        type: 'CREATE_NEW_BOOK',
        newBook: book
    };
};

const cleanBook = () => {
    return {
        type: 'CLEAN_BOOK'
    };
};

const saveAction = (params, id) => async () => {
    const response = await fetcher(`/books/${id}`, {
        method: 'PATCH',
        params: params
    });
    return response;
};

const bookRequest = (id) => {
    return {
        type: 'BOOK_REQUEST',
        id
    };
}

const bookRequestComplete = (book) => {
    return {
        type: 'BOOK_REQUEST_COMPLETE',
        book
    };
}

const fetchBook = (id) => {
    return dispatch => {
        dispatch(bookRequest(id));
        const token = getCookie('token')
        return fetch(`http://api.bookreader.k-3soft.com/api/books/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            method: 'GET'
        }).then(response => response.json())
            .then(data => dispatch(bookRequestComplete(data)))
    }
}

export {
    changeBookTitle,
    changeBookAuthor,
    changePageHeader,
    changePageParagraph,
    copyBookForChanges,
    removeMedia,
    selectMedia,
    removeHeaderMedia,
    selectHeaderMedia,
    dndOrder,
    createNewPageElement,
    createNewBook,
    cleanBook,
    saveAction,
    fetchBook,
    bookRequestComplete
};
