export default function Account(state = [], action) {
    switch (action.type) {
      case 'ACCOUNT_SUCCESS': {
        return action.payload;
      }
      case 'ACCOUNT_ERROR': {
        return state;
      }
      default:
        return state;
    }

  }