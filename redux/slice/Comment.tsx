import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentForm } from "../../type/Comment";
interface initialStateTYpe {
  Comment: CommentForm[];
}
const initialState: initialStateTYpe = {
  Comment: [],
};
const Comment = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setComment: (state, action: PayloadAction<CommentForm>) => {
      state.Comment.push(action.payload);
    },
  },
});

export default Comment.reducer;

export const { setComment } = Comment.actions;
