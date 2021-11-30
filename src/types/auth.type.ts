export interface SessionUser {
  password: string;
  email: string;
}

export interface User extends SessionUser {
  name: string;
}

export interface NewUser extends User {
  passwordConfirmation: string;
}

export interface JWT {
  accessToken: string;
  refreshToken: string;
}
