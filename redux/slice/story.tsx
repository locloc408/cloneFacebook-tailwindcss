import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
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
  ImageStory:
    "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.16376-6/58262940_285817512345690_8722691640277336064_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=a86453&_nc_ohc=W28CDOne5mQAX9m2Odh&_nc_ht=scontent.fsgn2-5.fna&oh=c34930363c8b6cf281fb660c94d685f9&oe=61B3924B",
};
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
