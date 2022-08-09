// [min, max) 구간에서 랜덤하게 숫자 반환
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
