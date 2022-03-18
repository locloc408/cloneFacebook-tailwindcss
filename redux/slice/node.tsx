import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentForm } from "../../type/Comment";
import { Node, ConnectionNode } from "../../component/testComp/CustomNode";
import { RootState } from "../store";
interface initialStateTYpe {
  Node: Node[];
  connectionNode: ConnectionNode[];
}
const initialState: initialStateTYpe = {
  Node: [],
  connectionNode: [],
};
const NodeSlice = createSlice({
  name: "node",
  initialState: initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.Node.push(action.payload);
    },
    addConnectionNode: (state, action: PayloadAction<ConnectionNode>) => {
      state.connectionNode.push(action.payload);
    },
  },
});

export default NodeSlice.reducer;

export const { addNode } = NodeSlice.actions;
export const node = (state: RootState) => state.NodeComment.Node;
export const connectionNode = (state: RootState) =>
  state.NodeComment.connectionNode;
