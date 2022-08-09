import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumber } from "../../utils/math";

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState: { boardArray: [] },
  reducers: {
    createEmptyBoard: (state, action) => {
      const { width, height } = action.payload;
      let data = [];
      for (let i = 0; i < height; i++) {
        data.push([]);
        for (let j = 0; j < width; j++) {
          data[i][j] = {
            x: i,
            y: j,
            isClicked: false,
            isMine: false,
            isFlagged: false,
            mineNeighbor: 0,
          };
        }
      }
      state.boardArray = data;
    },
    plantMines: (state, action) => {
      const { width, height, mine } = action.payload;
      let minesPlanted = 0;
      while (minesPlanted < mine) {
        let x = getRandomNumber(0, width);
        let y = getRandomNumber(0, height);
        if (!state.boardArray[x][y].isMine) {
          state.boardArray[x][y].isMine = true;
          minesPlanted += 1;
        }
      }
    },
    clickCell: (state, action) => {
      const { x, y } = action.payload;
      state.boardArray[x][y].isClicked = true;
    },
  },
});

export const { createEmptyBoard, plantMines, clickCell } = boardSlice.actions;
