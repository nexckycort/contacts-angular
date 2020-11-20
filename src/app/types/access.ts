export interface User {
  _id?: number;
  email: string;
  name: string;
}

export interface Signin {
  user: User;
  tokens: string;
}
