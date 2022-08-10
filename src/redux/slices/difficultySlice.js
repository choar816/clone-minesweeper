import { createSlice } from "@reduxjs/toolkit";

export const difficultySlice = createSlice({
  name: "difficultySlice",
  initialState: { width: 8, height: 8, mine: 10 },
  reducers: {
    changeDifficulty: (state, action) => {
      switch (action.payload) {
        case "beginner":
          state.width = 8;
          state.height = 8;
          state.mine = 1;
          break;
        case "intermediate":
          state.width = 16;
          state.height = 16;
          state.mine = 40;
          break;
        case "expert":
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

export const { changeDifficulty } = difficultySlice.actions;
