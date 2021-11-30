import http from '../utils/http-common';
import { SessionUser, User, NewUser, JWT } from '../types/auth.type';
import { AxiosResponse } from 'axios';

class AuthService {
  async login(data: SessionUser): Promise<AxiosResponse<JWT>> {
    const response = await http.post<JWT>('/sessions', data);
    if (response.data.accessToken) {
      console.log(JSON.stringify(response.data));
      localStorage.setItem('tokens', JSON.stringify(response.data));
    }
    return response;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  signin(data: NewUser): Promise<AxiosResponse<User>> {
    return http.post<User>('/users', data);
  }
}

export default new AuthService();
