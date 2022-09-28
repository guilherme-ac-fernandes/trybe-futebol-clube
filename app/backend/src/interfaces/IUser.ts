export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends ILogin {
  username: string,
  role: string,
}

export interface ICreateUser extends IUser {
  id: number,
}
