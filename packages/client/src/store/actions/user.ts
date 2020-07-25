import { Dispatch } from 'redux';

import { UserActionTypes } from '../types';
import { User } from '../reducers/userReducer';
import { loginRequest, LoginDTO } from '../../services/api';

function loginStarted() {
  return {
    type: UserActionTypes.loginStarted,
  };
}

function loginFailed(error: string) {
  return {
    type: UserActionTypes.loginFailed,
    payload: error,
  };
}

function loginSucces(user: User, token: string) {
  return {
    type: UserActionTypes.loginSuccess,
    payload: {
      user,
      token,
    },
  };
}

export function login({ username, password }: LoginDTO) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginStarted());
      const res = await loginRequest({ username, password });
      const { user, token } = res.data;
      dispatch(loginSucces(user, token));
    } catch (error) {
      dispatch(loginFailed(error));
    }
  };
}

export function logout() {
  return {
    type: UserActionTypes.logout,
  };
}
