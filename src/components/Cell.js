import React from "react";
import styled from "styled-components";
import { getCellTextColor } from "utils/board";

export const Cell = React.memo(({ y, x, isRevealed, didBust, minesNeighbor, children }) => {
  return (
    <Button y={y} x={x} isRevealed={isRevealed} didBust={didBust} minesNeighbor={minesNeighbor}>
      {children}
    </Button>
  );
});

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 1rem;
  background-color: #ccc;
  overflow: hidden;

  // 칸의 상태에 따라 칸의 스타일링을 달리 하는 부분
  ${({ isRevealed }) =>
    isRevealed &&
    `
    background-color: #caddff;
    border: 1px solid #000;
  `}
  ${({ didBust }) =>
    didBust &&
    `
    background-color: red;
  `}
  ${({ minesNeighbor }) => `color: ${getCellTextColor(minesNeighbor)};`}
`;
