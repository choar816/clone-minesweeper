import { createSlice } from "@reduxjs/toolkit";

// 게임 진행 상태에 관련된 정보와 함수를 갖고 있는 slice
export const gameSlice = createSlice({
  name: "gameSlice",
  initialState: {
    isStarted: false,
    isLost: false,
    isWon: false,
    isClicking: false,
    isGameModeDevelop: false,
    seconds: 0,
  },
  reducers: {
    // 게임 시작시 상태를 설정하는 함수
    startGame: (state) => {
      state.isStarted = true;
    },
    // 게임에서 졌을 때 상태를 설정하는 함수
    loseGame: (state) => {
      state.isStarted = false;
      state.isLost = true;
    },
    // 게임에서 이겼을 때 상태를 설정하는 함수
    winGame: (state) => {
      state.isStarted = false;
      state.isWon = true;
    },
    // 게임을 리셋했을 때 상태를 설정하는 함수
    resetGame: (state) => {
      state.isStarted = false;
      state.isWon = false;
      state.isLost = false;
    },
    // 마우스가 게임판을 누르고 있는지 아닌지의 상태를 설정하는 함수
    checkIsClicking: (state, action) => {
      state.isClicking = action.payload;
    },
    // 개발 모드 스위치가 on인지 off인지의 상태를 설정하는 함수
    setIsGameModeDevelop: (state, action) => {
      state.isGameModeDevelop = action.payload;
    },
    setSeconds: (state, action) => {
      const newSeconds = action.payload;
      state.seconds = newSeconds;
    },
  },
});

export const { startGame, loseGame, winGame, resetGame, checkIsClicking, setIsGameModeDevelop, setSeconds } =
  gameSlice.actions;
