import { UserReaction } from "./Comment";
export interface SubComment {
  replyCommentId: string;
  userId?: string;
  textInput?: string;
  statusId: string;
  _id: string;
}
export interface SubCommentRes extends SubComment {
  UserReaction: UserReaction[];
}
