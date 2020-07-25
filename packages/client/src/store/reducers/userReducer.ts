import { UserActionTypes } from '../types';

interface State {
  user: User | null;
  token: string;
  isLoading: boolean;
  error: string;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  surname: string;
  birthday: string;
}

type LoginStartedAction = {
  type: UserActionTypes.loginStarted;
};

type LoginFailedAction = {
  type: UserActionTypes.loginFailed;
  payload: string;
};

type LoginSuccessAction = {
  type: UserActionTypes.loginSuccess;
  payload: {
    user: User;
    token: string;
  };
};

type Action = LoginStartedAction | LoginFailedAction | LoginSuccessAction;

const initState: State = {
  user: null,
  token: '',
  isLoading: false,
  error: '',
};

function userReducer(state = initState, action: Action): State {
  switch (action.type) {
    case UserActionTypes.loginStarted:
      return {
        ...state,
        isLoading: true,
      };

    case UserActionTypes.loginFailed:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case UserActionTypes.loginSuccess:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
}

export default userReducer;
