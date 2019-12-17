export interface PostResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  page?: number;
  posts?: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  coords?: string[];
  mensaje?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
}