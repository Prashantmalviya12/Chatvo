export interface userModel {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export type userResponse = {
  data: userModel[];
  message: string;
  success: boolean;
};
