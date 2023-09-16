import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "auto" | "light" | "dark";

export interface LayoutState {
  drawerOpen: boolean;
  history: ResultHistory[];
  darkMode: ThemeMode;
}

export interface ResultHistory {
  time: number;
  tool: string;
  input: Object;
  output: string;
}

const initialState = {
  drawerOpen: true,
  history: [],
  darkMode: "auto",
} as LayoutState;

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    appendHistory: (state, action: PayloadAction<ResultHistory>) => {
      state.history.unshift(action.payload);
    },
    setDarkMode: (state, action: PayloadAction<ThemeMode>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDrawer, appendHistory, setDarkMode } = layoutSlice.actions;

export default layoutSlice.reducer;
