import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface initialStateType {
  showModal: boolean;
}
const initialState: initialStateType = {
  showModal: false,
};
const Status = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

export default Status.reducer;
export const { changeModal } = Status.actions;
export const ShowModal = (state: RootState) => state.StatusReducer.showModal;
