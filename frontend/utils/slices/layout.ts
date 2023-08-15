import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LayoutState {
  drawerOpen: boolean;
  history: ResultHistory[];
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
} as LayoutState;

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    appendHistory: (state, action: PayloadAction<ResultHistory>) => {
      console.log('append history', action.payload)
      state.history.unshift(action.payload);
    },
  },
});

export const { toggleDrawer, appendHistory } = layoutSlice.actions;

export default layoutSlice.reducer;
