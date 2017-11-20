import { fetchToState, fetcher } from 'react-isomorphic-tools';

const test = ({ fetchToState }) => {
  return fetchToState('/search/result?type=advert', {
    key: 'adverts'
  });
};

const testFull = ({ fetchToState, params }) => {
  return fetchToState(`/adverts/${params.id}`, {
    key: 'advertsFull'
  });
};

const books = ({ fetchToState }) => {
  return fetchToState('/books/own', {
    key: 'books'
  });
};

const book = ({ fetchToState, params }) => {
  return fetchToState(`/books/${params.id}`, {
    key: 'book'
  });
};

const saveAction = (params, id) => async () => {
  const response = await fetcher(`/books/${id}`, {
    method: 'PATCH',
    params: params
  });
  return response;
};

const getBook = id => async dispatch => {
  try {
    return await fetchToState(`/books/${id}`, { key: 'book' })(dispatch);
  } catch (e) {
    console.log('get rubrics err', e);
    throw e.error;
  }
};

export { test, testFull, books, book, saveAction, getBook };
