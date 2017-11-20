import { Auth } from 'react-isomorphic-tools';

export default () => next => action => {
  if (!Auth.isAuthenticated() && location.pathname !== '/login') {
    window.location = '/login';
  }
  if (Auth.isAuthenticated() && location.pathname == '/login') {
    window.location = '/';
  }
  next(action);
};
