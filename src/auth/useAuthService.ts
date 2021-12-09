import router from '@/router';
import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  GetIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  PopupConfigOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js';
import { computed, reactive } from 'vue';

interface Auth0Error {
  error_description: string;
  error: string;
  message: string;
  stack: string;
}

let auth0Client: Auth0Client;

interface State {
  loading: boolean;
  isAuthenticated: boolean;
  user?: User;
  error: unknown;
  popupOpen: boolean;
}

const DEFAULT_REDIRECT_CALLBACK = (): Promise<any> =>
  router.replace(window.location.pathname);

/* For projects that don't use the vue router
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
*/
const state = reactive<State>({
  loading: true,
  isAuthenticated: false,
  user: undefined,
  error: null,
  popupOpen: false,
});

const loginWithPopup = async (
  options?: PopupLoginOptions,
  config?: PopupConfigOptions,
): Promise<void> => {
  state.popupOpen = true;

  try {
    await auth0Client.loginWithPopup(options, config);
    state.user = await auth0Client.getUser();
    state.isAuthenticated = await auth0Client.isAuthenticated();
    state.error = null;
  } catch (e) {
    console.error(e);
    state.error = e;
  } finally {
    state.popupOpen = false;
  }
};

const loginWithRedirect = (o?: RedirectLoginOptions): Promise<void> =>
  auth0Client.loginWithRedirect(o);

const getIdTokenClaims = (o?: GetIdTokenClaimsOptions): Promise<any> =>
  auth0Client.getIdTokenClaims(o);

const getTokenSilently = (o?: GetTokenSilentlyOptions): Promise<any> =>
  auth0Client.getTokenSilently(o);

const getTokenWithPopup = (o?: GetTokenWithPopupOptions): Promise<any> =>
  auth0Client.getTokenWithPopup(o);

const logout = (o?: LogoutOptions): void | Promise<void> =>
  auth0Client.logout(o);

const initializeAuth = async (
  options: Auth0ClientOptions,
  onRedirectCallback: (appState?: any) => void = DEFAULT_REDIRECT_CALLBACK,
  redirectUri: string = window.location.origin,
): Promise<void> => {
  auth0Client = await createAuth0Client({
    ...options,
    redirect_uri: redirectUri,
  });

  try {
    if (
      (window.location.search.includes('code=') &&
        window.location.search.includes('state=')) ||
      window.location.search.includes('error=')
    ) {
      const { appState } = await auth0Client.handleRedirectCallback();
      state.error = null;
      onRedirectCallback(appState);
    }
  } catch (e) {
    state.error = e as Auth0Error;
    return;
  } finally {
    state.isAuthenticated = await auth0Client.isAuthenticated();
    state.user = await auth0Client.getUser();
    state.loading = false;
  }
};

export const useAuth = (): any => {
  return {
    isAuthenticated: computed(() => state.isAuthenticated),
    loading: computed(() => state.loading),
    user: computed(() => state.user),
    error: computed(() => state.error),
    loginWithPopup,
    getIdTokenClaims,
    getTokenSilently,
    getTokenWithPopup,
    loginWithRedirect,
    logout,
    initializeAuth,
  };
};
