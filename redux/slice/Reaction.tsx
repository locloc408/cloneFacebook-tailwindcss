import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface StoryReaction {
  type: string;
  storyId: string;
  viewerId: string;
}
interface initialState {
  storyReaction: StoryReaction[];
}

const initialState: initialState = {
  storyReaction: [],
};

const Reaction = createSlice({
  name: "reaction",
  initialState: initialState,
  reducers: {
    setReaction: (state, action: PayloadAction<StoryReaction>) => {
      state.storyReaction.push(action.payload);
    },
  },
});

export default Reaction.reducer;

export const { setReaction } = Reaction.actions;
export const storyReaction = (state: RootState) =>
  state.ReactionReducer.storyReaction;
