// [min, max) 구간에서 랜덤하게 정수를 반환하는 함수
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
