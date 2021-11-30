import { defineStore } from 'pinia';
import AuthService from '../services/auth.service';
import { JWT, SessionUser, NewUser } from '@/types/auth.type';

const storedTokens = localStorage.getItem('tokens');

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      tokens: storedTokens ? JSON.parse(storedTokens) : null,
      status: storedTokens ? { loggedIn: true } : { loggedIn: false },
    };
  },
  getters: {
    isLoggedIn: (state) => state.status.loggedIn,
  },
  actions: {
    updateTokens(tokens: JWT) {
      this.tokens = tokens;
    },
    updateStatus(status: boolean) {
      this.status.loggedIn = status;
    },
    signin(user: NewUser): void {
      AuthService.signin(user);
    },
    login(user: SessionUser): void {
      AuthService.login(user).then(
        (res) => {
          console.log(res);
          this.updateTokens(res.data);
          this.updateStatus(true);
        },
        (error) => {
          this.updateTokens(<JWT>{});
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
        },
      );
    },
    logout(): void {
      AuthService.logout();
      this.updateTokens(<JWT>{});
      this.updateStatus(false);
    },
  },
});
