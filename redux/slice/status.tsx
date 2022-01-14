import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface initialStateType {
  showModal: boolean;
  showInputZone: boolean;
}
const initialState: initialStateType = {
  showModal: false,
  showInputZone: false,
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
  },
});

export default Status.reducer;
export const { changeModal, setshowInputZone } = Status.actions;
export const ShowModal = (state: RootState) => state.StatusReducer.showModal;
export const ShowInputZone = (state: RootState) =>
  state.StatusReducer.showInputZone;
