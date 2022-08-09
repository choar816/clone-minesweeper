import { createSlice } from "@reduxjs/toolkit";

export const difficultySlice = createSlice({
  name: "difficultySlice",
  initialState: { width: 8, height: 8, mine: 10 },
  reducers: {
    change: (state, action) => {
      switch (action.payload) {
        case "Beginner":
          state.width = 8;
          state.height = 8;
          state.mine = 10;
          break;
        case "Intermediate":
          state.width = 16;
          state.height = 16;
          state.mine = 40;
          break;
        case "Expert":
          state.width = 32;
          state.height = 16;
          state.mine = 99;
          break;
        default:
          state.width = 8;
          state.height = 8;
          state.mine = 10;
          break;
      }
    },
  },
});

export const { change } = difficultySlice.actions;
