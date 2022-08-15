// 칸의 내용물을 리턴하는 함수
export const getCellContent = (
  { isFalseAlarm, isRevealed, isFlagged, isQuestionable, isMine, minesNeighbor },
  isGameModeDevelop
) => {
  if (isFalseAlarm) return "❌";
  if (isFlagged) return "🚩";
  if (isQuestionable) return "?";
  if (!isGameModeDevelop) {
    if (!isRevealed) return "";
  }
  if (isMine) return "💣";
  if (minesNeighbor === 0) return "";
  return `${minesNeighbor}`;
};

// 칸에 적혀진 텍스트의 색깔을 리턴하는 함수
// minesNeighbor 숫자의 색을 값마다 다르게 나타냄
export const getCellTextColor = (minesNeighbor) => {
  switch (minesNeighbor) {
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "red";
    case 4:
      return "darkblue";
    case 5:
      return "darkred";
    case 6:
      return "darkcyan";
    case 8:
      return "dimgray";
    default:
      return "black";
  }
};
