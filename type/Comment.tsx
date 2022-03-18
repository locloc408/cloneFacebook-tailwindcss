import { UserType } from "./User";

export interface CommentForm {
  textInput: string;
  userId: string;
  statusId: string;
}

export interface UserReaction {
  _id: string;
  userId: string;
  reactionType: string;
}

export interface CommentRes {
  textInput: string;
  statusId: string;
  UserReaction: UserReaction[];
  userId: UserType;
  _id: string;
}
