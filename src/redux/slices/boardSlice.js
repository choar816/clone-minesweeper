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
            minesNeighbor: 0,
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
    getMinesNeighbor: (state, action) => {
      const { width, height } = action.payload;
      const dx = [0, 0, 1, 1, 1, -1, -1, -1];
      const dy = [1, -1, 0, 1, -1, 0, 1, -1];

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (state.boardArray[x][y].isMine) {
            continue;
          }

          let minesNeightbor = 0;
          for (let i = 0; i < 8; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (
              0 <= nx &&
              nx < width &&
              0 <= ny &&
              ny < height &&
              state.boardArray[nx][ny].isMine
            ) {
              minesNeightbor += 1;
            }
          }
          state.boardArray[x][y].minesNeightbor = minesNeightbor;
        }
      }
    },
    clickCell: (state, action) => {
      const { x, y } = action.payload;
      state.boardArray[x][y].isClicked = true;
    },
  },
});

export const { createEmptyBoard, plantMines, getMinesNeighbor, clickCell } =
  boardSlice.actions;
