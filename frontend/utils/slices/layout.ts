import { createSlice } from "@reduxjs/toolkit";

export interface LayoutState {
  drawerOpen: boolean;
}

const initialState = {
  drawerOpen: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDrawer } = layoutSlice.actions;

export default layoutSlice.reducer;
