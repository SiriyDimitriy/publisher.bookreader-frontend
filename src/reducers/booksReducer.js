const Books = (state = {}, action) => {
  switch (action.type) {
    case 'GET_BOOKS': {
      return action.payload;
    }
    case 'DELETE_BOOK_ID': {
      let newState = { ...state };

      const Items = state.items.filter(item => item.id !== action.payload);

      newState.items = Items;

      // console.log('newState', newState);

      return { ...newState };
    }
    case 'SORT_BOOKS': {
      return action.payload;
    }
    case 'IS_COMPLETED': {
      return { ...state };
    }
    case 'PUSH_NEW_BOOK': {
      let newState = { ...state };
      // newState.items.push(action.payload);
      console.log('newState', newState);
      return newState;
    }
    default:
      return state;
  }
};

export default Books;
