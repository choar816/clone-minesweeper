import styled from "styled-components";

export const Cell = ({ isClicked, isFlagged, isMine, minesAround }) => {
  if (!isClicked) return <div>🤫</div>;
  if (isFlagged) return <div>🚩</div>;
  if (isMine) return <div>💣</div>;
  return <div>{minesAround}</div>;
};
