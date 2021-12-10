import store from "./store";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
