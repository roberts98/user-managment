import axios, { AxiosPromise } from 'axios';
import { User } from '../store/reducers/userReducer';

export interface RegisterDTO {
  username: string;
  password: string;
  name: string;
  surname: string;
  birthday: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export function registerRequest(data: RegisterDTO) {
  return axios('/api/users', {
    method: 'POST',
    data,
  });
}

export function loginRequest(
  data: LoginDTO
): AxiosPromise<{ success: boolean; user: User; token: string }> {
  return axios('/api/users/login', {
    method: 'POST',
    data,
  });
}
