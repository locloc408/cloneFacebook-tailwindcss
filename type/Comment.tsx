import { UserType } from "./User";

export interface CommentForm {
  textInput: string;
  userId: string;
  statusId: string;
}

export interface CommentRes {
  textInput: string;
  statusId: string;
  UserReaction: any[];
  userId: UserType;
  _id: string;
}
