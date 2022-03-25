import { UserType } from "./User";
import { SubCommentRes } from "./SubComment";
export interface CommentForm {
  textInput: string;
  userId: string;
  statusId: string;
  _id?: string;
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
  SubComments: [
    {
      SubCommentsId: SubCommentRes;
    }
  ];
}
