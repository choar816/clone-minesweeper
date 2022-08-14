import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState: { isStarted: false, isLost: false, isWon: false, isClicking: false, isGameModeDevelop: false },
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
    resetGame: (state, action) => {
      state.isStarted = false;
      state.isWon = false;
      state.isLost = false;
    },
    checkIsClicking: (state, action) => {
      state.isClicking = action.payload;
    },
    changeGameMode: (state, action) => {
      state.isGameModeDevelop = action.payload;
    },
  },
});

export const { startGame, loseGame, winGame, resetGame, checkIsClicking, changeGameMode } = gameSlice.actions;
