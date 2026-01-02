export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  username: string;
  avatar?: string;
  bio?: string;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
}
