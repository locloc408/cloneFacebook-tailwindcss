import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentForm, relpliComment } from "../../type/Comment";
import { RootState } from "../store";
interface initialStateTYpe {
  ReplyComment: relpliComment;
  isDoneInput: boolean;
  nodeId: string;
}
const initialState: initialStateTYpe = {
  ReplyComment: {
    replyCommentId: "",
  },
  isDoneInput: false,
  nodeId: "",
};
const Comment = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setReplyComment: (state, action: PayloadAction<relpliComment>) => {
      state.ReplyComment = action.payload;
    },
    setisDoneInput: (state, action: PayloadAction<boolean>) => {
      state.isDoneInput = action.payload;
    },
    setNodeId: (state, action: PayloadAction<string>) => {
      state.nodeId = action.payload;
    },
  },
});

export default Comment.reducer;

export const {
  setReplyComment,

  setisDoneInput,
  setNodeId,
} = Comment.actions;
export const ReplyComment = (state: RootState) =>
  state.CommentReducer.ReplyComment;
export const IsDoneInput = (state: RootState) =>
  state.CommentReducer.isDoneInput;
export const NodeId = (state: RootState) => state.CommentReducer.nodeId;
