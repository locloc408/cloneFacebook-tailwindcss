import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface initialStateTYpe {
  isDoneInput: boolean;
  nodeId: string;
}
const initialState: initialStateTYpe = {
  isDoneInput: false,
  nodeId: "",
};
const Comment = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setisDoneInput: (state, action: PayloadAction<boolean>) => {
      state.isDoneInput = action.payload;
    },
    setNodeId: (state, action: PayloadAction<string>) => {
      state.nodeId = action.payload;
    },
  },
});

export default Comment.reducer;

export const { setisDoneInput, setNodeId } = Comment.actions;

export const IsDoneInput = (state: RootState) =>
  state.CommentReducer.isDoneInput;
export const NodeId = (state: RootState) => state.CommentReducer.nodeId;
