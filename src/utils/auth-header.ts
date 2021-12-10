import { AxiosRequestHeaders } from 'axios';
import { useAuth } from '../auth/useAuthService';

export default async function getAuthHeader(): Promise<AxiosRequestHeaders> {
  const { getTokenSilently } = useAuth();
  const token = await getTokenSilently();
  return {
    Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
  };
}
