export interface SessionUser {
  password: string;
  email: string;
}

export interface User {
  name: string;
  email: string;
}

export interface NewUser extends User {
  password: string;
  passwordConfirmation: string;
}

export interface UserInfo extends User {
  accessToken: string;
  refreshToken: string;
  _id: string;
}
