import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumber } from "../../utils/math";

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState: { boardArray: [] },
  reducers: {
    createEmptyBoard: (state, action) => {
      const { width, height } = action.payload;
      let newArray = [];
      for (let i = 0; i < height; i++) {
        newArray.push([]);
        for (let j = 0; j < width; j++) {
          newArray[i][j] = {
            y: i,
            x: j,
            isClicked: false,
            isMine: false,
            isFlagged: false,
            minesNeighbor: 0,
          };
        }
      }
      state.boardArray = newArray;
    },
    plantMines: (state, action) => {
      const { width, height, mine } = action.payload;
      let minesPlanted = 0;
      while (minesPlanted < mine) {
        let y = getRandomNumber(0, height);
        let x = getRandomNumber(0, width);
        if (!state.boardArray[y][x].isMine) {
          state.boardArray[y][x].isMine = true;
          minesPlanted += 1;
        }
      }
    },
    getMinesNeighbor: (state, action) => {
      const { width, height } = action.payload;
      const dy = [1, -1, 0, 1, -1, 0, 1, -1];
      const dx = [0, 0, 1, 1, 1, -1, -1, -1];

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (state.boardArray[y][x].isMine) {
            continue;
          }

          let minesNeighbor = 0;
          for (let i = 0; i < 8; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            if (
              0 <= ny &&
              ny < height &&
              0 <= nx &&
              nx < width &&
              state.boardArray[ny][nx].isMine
            ) {
              minesNeighbor += 1;
            }
          }
          state.boardArray[y][x].minesNeighbor = minesNeighbor;
        }
      }
    },
    clickCell: (state, action) => {
      const { y, x } = action.payload;
      state.boardArray[y][x].isClicked = true;
    },
  },
});

export const { createEmptyBoard, plantMines, getMinesNeighbor, clickCell } =
  boardSlice.actions;
