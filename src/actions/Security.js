import { Auth, fetcher } from 'react-isomorphic-tools';
import { SubmissionError } from 'redux-form';

export const login = form => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN_ACCOUNT'
    });
    const response = await fetcher('/login_check', {
      params: { ...form },
      method: 'POST'
    });
    Auth.setToken(response.token);
    Auth.setRefreshToken(response.refreshToken);
    await dispatch(getAccount());
  } catch (e) {
    throw new SubmissionError({
      _error: 'login failed email or password were incorrect'
    });
  }
};

export const getAccount = () => async dispatch => {
  if (!Auth.isAuthenticated()) {
    dispatch({
      type: 'ACCOUNT_ERROR'
    });
    return;
  }

  try {
    dispatch({
      type: 'ACCOUNT_SUCCESS',
      payload: await fetcher('/profiles/own')
    });
  } catch (e) {
    dispatch({
      type: 'ACCOUNT_ERROR'
    });
    throw new SubmissionError({ _error: 'error getAccount' });
  }
};

export const logout = () => dispatch => {
  try {
    Auth.logout();
    dispatch({
      type: 'LOGOUT_SUCCESS'
    });
  } catch (e) {
    dispatch({
      type: 'LOGOUT_ERROR'
    });
    throw e.error;
  }
};
