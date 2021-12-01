import http from '../utils/http-common';
import { SessionUser, User, NewUser, UserInfo } from '../types/auth.type';
import { AxiosResponse } from 'axios';

class AuthService {
  async login(data: SessionUser): Promise<UserInfo> {
    const response = await http.post('/sessions', data);
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    const userInfo = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      email: response.data.email,
      name: response.data.name,
      _id: response.data._id,
    };
    return userInfo;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  async signin(data: NewUser): Promise<UserInfo> {
    const response = await http.post('/users', data);
    const user = {
      name: response.data.name,
      _id: response.data._id,
      email: response.data.email,
      accessToken: '',
      refreshToken: '',
    };
    return user;
  }
}

export default new AuthService();
