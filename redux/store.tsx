import { configureStore } from "@reduxjs/toolkit";
// ...
import StoryReducer from "./slice/story";
import StatusReducer from "./slice/status";
import StoriesReducer from "./slice/Stories";
import ReactionReducer from "./slice/Reaction";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
const reducers = combineReducers({
  StoryReducer: StoryReducer,
  StatusReducer: StatusReducer,
  StoriesReducer: StoriesReducer,
  ReactionReducer: ReactionReducer,
});
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["ReactionReducer", "StatusReducer"],
};
const _persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "your/action/type",
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
