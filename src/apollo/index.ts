import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '../auth/useAuthService';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
});

// Add the headers
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const { isAuthenticated, loading, getTokenSilently } = useAuth();
  if (isAuthenticated) {
    const token = await getTokenSilently();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default apolloClient;
