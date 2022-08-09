export const getCellContent = ({ isClicked, isFlagged, isMine, mineNeighbor }) => {
  if (!isClicked) return "🤫";
  if (isFlagged) return "🚩";
  if (isMine) return "💣";
  return `${mineNeighbor}`;
};