interface Response {
  success: boolean;
  data: any;
  message: string;
}

export interface LoginResponse extends Response {
  data: LoginData;
}
export interface PostResponse extends Response{
  data: PostData;
}

export interface LoginData {
  token: string;
}

export interface PostData {
  page: number;
  posts: Post[];
}

export interface Post {
  imgs: string[];
  _id: string;
  coords: string[];
  mensaje: string;
  usuario: Usuario;
  created: string;
}

export interface Usuario {
  avatar: string;
  _id: string;
  nombre: string;
  email: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  avatar: string;
  name: string;
  email: string;
  password: string;
}