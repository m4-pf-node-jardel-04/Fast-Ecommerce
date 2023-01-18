export interface IUserRequest {

  name: string
  email: string
  password: string
  isAdm?: boolean;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserResponseDelete {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserSave {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserLogin {
  email: string;
  password: string;
};

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
};

export interface IUserWithNameAndId {
  name: string;
  id: string;
};
