import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState: { isStarted: false, isLost: false, isWon: false },
  reducers: {
    startGame: (state, action) => {
      state.isStarted = true;
    },
    loseGame: (state, action) => {
      state.isStarted = false;
      state.isLost = true;
    },
    winGame: (state, action) => {
      state.isStarted = false;
      state.isWon = true;
    },
  },
});

export const { startGame, loseGame, winGame } = gameSlice.actions;
