import { createSlice } from "@reduxjs/toolkit";

// 게임 난이도에 관련된 정보와 함수를 갖고 있는 slice
export const difficultySlice = createSlice({
  name: "difficultySlice",
  // width: 너비, height: 높이, mine: 지뢰수
  initialState: { width: 8, height: 8, mine: 10 },
  reducers: {
    // 초급, 중급, 고급 중 난이도를 선택하는 함수
    chooseDifficulty: (state, action) => {
      switch (action.payload) {
        case "beginner":
          state.width = 8;
          state.height = 8;
          state.mine = 10;
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
    // 난이도를 직접 설정하는 함수
    customDifficulty: (state, action) => {
      const { width, height, mine } = action.payload;
      state.width = width;
      state.height = height;
      state.mine = mine;
    },
  },
});

export const { chooseDifficulty, customDifficulty } = difficultySlice.actions;
