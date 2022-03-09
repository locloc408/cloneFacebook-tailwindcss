import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusPostType } from "../../type/Status";
import { RootState } from "../store";
interface initialStateType {
  showModal: boolean;
  showInputZone: boolean;
  file: any[];
  showStatusWhenPost: StatusPostType[];
  postFlag: boolean;
}
const initialState: initialStateType = {
  showModal: false,
  showInputZone: false,
  file: [],
  showStatusWhenPost: [],
  postFlag: false,
};
const Status = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setshowInputZone: (state, action: PayloadAction<boolean>) => {
      state.showInputZone = action.payload;
    },
    setStatusResponseItems: (state, action: PayloadAction<StatusPostType>) => {
      state.showStatusWhenPost = [action.payload, ...state.showStatusWhenPost];
    },
    changepostFlag: (state) => {
      state.postFlag = !state.postFlag;
    },
  },
});

export default Status.reducer;
export const {
  changeModal,
  setshowInputZone,
  setStatusResponseItems,
  changepostFlag,
} = Status.actions;
export const ShowModal = (state: RootState) => state.StatusReducer.showModal;
export const ShowInputZone = (state: RootState) =>
  state.StatusReducer.showInputZone;
export const File = (state: RootState) => state.StatusReducer.file;
export const showStatusWhenPost = (state: RootState) =>
  state.StatusReducer.showStatusWhenPost;
export const postFlag = (state: RootState) => state.StatusReducer.postFlag;
