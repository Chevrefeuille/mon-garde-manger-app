import { AxiosRequestHeaders } from 'axios';
import { UserInfo } from '@/types/auth.type';

export default function getAuthHeader(): AxiosRequestHeaders {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user: UserInfo = JSON.parse(storedUser ? storedUser : '');

    if (user && user.accessToken) {
      return {
        Authorization: `Bearer ${user.accessToken}`,
        'x-refresh': user.refreshToken,
      };
    } else {
      return {};
    }
  } else {
    return {};
  }
}
