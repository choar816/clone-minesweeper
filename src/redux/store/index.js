import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "../slices/boardSlice";
import { difficultySlice } from "../slices/difficultySlice";

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    difficulty: difficultySlice.reducer
  },
});
