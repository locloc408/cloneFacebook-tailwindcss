import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fecthData } from "../../lib/axios/fetchClientData";
import { StoryType, StoryContainer, postStoryText } from "../../type/Stories";
interface initialStateType {
  textStyle: string;
  color: string;
  openChangeTextMenu: boolean;
  TextInput: string;
  ImageStory: string;
}
const initialState: initialStateType = {
  textStyle: "",
  color: "white",
  openChangeTextMenu: false,
  TextInput: "Bắt Đầu Nhập",
  ImageStory: "/backgroundStories/1.jpg",
};
export const postTextStory = createAsyncThunk(
  "post",

  async (data: postStoryText) => {
    await fecthData.postStories(data);
  }
);
const Story = createSlice({
  name: "story",
  initialState,
  reducers: {
    setTextStyle: (state, action: PayloadAction<string>) => {
      state.textStyle = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setOpenChangeTextMenu: (state) => {
      state.openChangeTextMenu = !state.openChangeTextMenu;
    },
    setTextInput: (state, action: PayloadAction<string>) => {
      state.TextInput = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.ImageStory = action.payload;
    },
  },
});

export default Story.reducer;
export const {
  setColor,
  setTextStyle,
  setOpenChangeTextMenu,
  setTextInput,
  setImg,
} = Story.actions;
export const Color = (state: RootState) => state.StoryReducer.color;
export const TextStyle = (state: RootState) => state.StoryReducer.textStyle;
export const IsTextMenuOpen = (state: RootState) =>
  state.StoryReducer.openChangeTextMenu;
export const TextInput = (state: RootState) => state.StoryReducer.TextInput;
export const ImageStory = (state: RootState) => state.StoryReducer.ImageStory;
