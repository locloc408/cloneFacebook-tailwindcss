import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fecthData } from "../../lib/axios/fetchClientData";
import { StoryViewerReact, StoryType, LatestStory } from "../../type/Stories";
import { RootState } from "../store";
interface StoryFriend {
  userId: string;
  storyFriendIndex: number;
  storyId: string;
}
interface StoryReaction {
  type: string;
  storyId: string;
  viewerId: string;
}
interface InitialState {
  userId: string;
  storyFriendIndex: number;
  storyReaction: StoryReaction[];
  storyId: string;
  pause: boolean;
  sortedStories: LatestStory[];
  flagStory: boolean;
}
const initialState: InitialState = {
  userId: "",
  storyFriendIndex: 0,
  storyReaction: [],
  storyId: "",
  pause: false,
  sortedStories: [],
  flagStory: false,
};
export const postStoryReaction = createAsyncThunk(
  "postStatus",
  async (data: StoryViewerReact) => {
    const res = await fecthData.postStoryReaction(data);
    return res;
  }
);
const Stories = createSlice({
  name: "stories",
  initialState: initialState,
  reducers: {
    showStoryDetail: (state, action: PayloadAction<StoryFriend>) => {
      state.userId = action.payload.userId;
      state.storyFriendIndex = action.payload.storyFriendIndex;
      state.storyId = action.payload.storyId;
    },
    setStoryId: (state, action: PayloadAction<string>) => {
      state.storyId = action.payload;
    },
    setReaction: (state, action: PayloadAction<StoryReaction>) => {
      state.storyReaction.push(action.payload);
    },
    setPause: (state, action: PayloadAction<boolean>) => {
      state.pause = action.payload;
    },
    setSortedStory: (state, action: PayloadAction<LatestStory[]>) => {
      state.sortedStories = action.payload;
    },
    setFlagStory: (state, action: PayloadAction<boolean>) => {
      state.flagStory = action.payload;
    },
  },
});

export default Stories.reducer;
export const {
  showStoryDetail,
  setStoryId,
  setReaction,
  setPause,
  setSortedStory,
  setFlagStory,
} = Stories.actions;
export const storyFriendIndex = (state: RootState) =>
  state.StoriesReducer.storyFriendIndex;
export const userId = (state: RootState) => state.StoriesReducer.userId;
export const storyReaction = (state: RootState) =>
  state.StoriesReducer.storyReaction;
export const storyId = (state: RootState) => state.StoriesReducer.storyId;
export const pause = (state: RootState) => state.StoriesReducer.pause;
export const sortedStories = (state: RootState) =>
  state.StoriesReducer.sortedStories;
export const flagStory = (state: RootState) => state.StoriesReducer.flagStory;
