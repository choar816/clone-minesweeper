import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState: { boardArray: [] },
  reducers: {
    createEmptyBoard: (state, action) => {
      let { width, height } = action.payload;
      let data = [];
      for (let i = 0; i < height; i++) {
        data.push([]);
        for (let j = 0; j < width; j++) {
          data[i][j] = {
            isClicked: false,
            isMine: false,
            isFlagged: false,
            neighbor: 0,
          };
        }
      }
      state.boardArray = data;
    },
    plantMines: (state, action) => {

    },
  },
});

export const { createEmptyBoard } = boardSlice.actions;
