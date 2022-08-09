export const getCellContent = ({ isClicked, isFlagged, isMine, minesNeighbor }) => {
  // if (!isClicked) return "🤫";
  if (isFlagged) return "🚩";
  if (isMine) return "💣";
  // if (minesNeighbor === 0) return "";
  return `${minesNeighbor}`;
};