import { ObjectId } from "mongoose";
import { UserType } from "./User";
export interface UserReaction {
  userId: string;
  reactionType: string;
}

export interface UserReactionPost extends UserReaction {
  statusId: string;
}
export interface StatusPostType {
  ImageUrl: string;
  textInput: string;
  statusId: string;
}
export interface StatusResponseItems extends StatusPostType {
  usersReaction: UserReaction[];
  createdAt: string | null;
  _id: string;
}

export interface StatusResponseList {
  status: [StatusResponseItems];
  statusUser: UserType;
  _id: string;
}
