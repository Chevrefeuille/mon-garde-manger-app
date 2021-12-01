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
    login(user: SessionUser): void {
      AuthService.login(user).then(
        (res) => {
          console.log(res);
          this.updateUser(res);
          this.updateStatus(true);
        },
        (error) => {
          this.updateUser(<UserInfo>{});
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        },
      );
    },
    logout(): void {
      AuthService.logout();
      this.updateUser(<UserInfo>{});
      this.updateStatus(false);
    },
  },
});
