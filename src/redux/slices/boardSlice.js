import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumber } from "../../utils/math";

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState: { boardArray: [], revealedCells: 0 },
  reducers: {
    // 빈 board를 난이도별 크기에 맞게 만드는 action
    createEmptyBoard: (state, action) => {
      const { width, height } = action.payload;
      let newArray = [];
      for (let i = 0; i < height; i++) {
        newArray.push([]);
        for (let j = 0; j < width; j++) {
          newArray[i][j] = {
            y: i,
            x: j,
            isRevealed: false,
            isMine: false,
            isFlagged: false,
            isQuestionable: false,
            minesNeighbor: 0,
          };
        }
      }
      state.boardArray = newArray;
      state.revealedCells = 0;
    },
    // board에 지뢰를 난이도별 지뢰 개수게 맞게 심는 action
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
    // board를 처음부터 끝까지 훑으며, 지뢰가 없는 칸의 경우
    // 인접한(가로, 세로, 대각선) 칸에 있는 지뢰의 개수를 기록하는 action
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
            if (0 <= ny && ny < height && 0 <= nx && nx < width && state.boardArray[ny][nx].isMine) {
              minesNeighbor += 1;
            }
          }
          state.boardArray[y][x].minesNeighbor = minesNeighbor;
        }
      }
    },
    // cell을 여는 action
    revealCell: (state, action) => {
      const { y, x } = action.payload;
      state.boardArray[y][x].isRevealed = true;
      state.revealedCells += 1;
    },
    // cell에 우클릭 했을 때 기능을 처리하는 action
    handleCellRightClick: (state, action) => {
      const { y, x, isRevealed, isFlagged, isQuestionable } = action.payload;
      if (isRevealed) {
        return;
      }
      if (isFlagged) {
        state.boardArray[y][x].isFlagged = false;
        state.boardArray[y][x].isQuestionable = true;
        return;
      }
      if (isQuestionable) {
        state.boardArray[y][x].isQuestionable = false;
        return;
      }
      state.boardArray[y][x].isFlagged = true;
    },
  },
});

export const { createEmptyBoard, plantMines, getMinesNeighbor, revealCell, handleCellRightClick } = boardSlice.actions;
