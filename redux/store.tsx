import { configureStore } from "@reduxjs/toolkit";
// ...
import StoryReducer from "./slice/story";
import StatusReducer from "./slice/status";
const store = configureStore({
  reducer: {
    StoryReducer,
    StatusReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
