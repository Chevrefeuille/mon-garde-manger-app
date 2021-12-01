import { defineStore } from 'pinia';
import AuthService from '../services/auth.service';
import { SessionUser, NewUser, UserInfo } from '@/types/auth.type';

const storedUser = localStorage.getItem('user');

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      status: storedUser ? { loggedIn: true } : { loggedIn: false },
    };
  },
  getters: {
    isLoggedIn: (state) => state.status.loggedIn,
  },
  actions: {
    updateStatus(status: boolean) {
      this.status.loggedIn = status;
    },
    updateUser(user: UserInfo) {
      this.user = user;
    },
    signin(user: NewUser): void {
      AuthService.signin(user);
    },
    login(user: SessionUser): Promise<void> {
      return AuthService.login(user)
        .then((res) => {
          this.updateUser(res);
          this.updateStatus(true);
          return Promise.resolve();
        })
        .catch((error) => {
          this.updateUser(<UserInfo>{});
          return Promise.reject(error);
        });
    },
    logout(): void {
      AuthService.logout();
      this.updateUser(<UserInfo>{});
      this.updateStatus(false);
    },
  },
});
