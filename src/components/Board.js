import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmptyBoard,
  plantMines,
  getMinesNeighbor,
  clickCell,
  flagCell,
} from "../redux/slices/boardSlice";
import { changeDifficulty } from "../redux/slices/difficultySlice";
import styled from "styled-components";

const getCellContent = ({ isClicked, isFlagged, isMine, minesNeighbor }) => {
  // if (!isClicked) return "🤫";
  if (isFlagged) return "🚩";
  if (isMine) return "💣";
  // if (minesNeighbor === 0) return "";
  return `${minesNeighbor}`;
};

export const Board = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const boardArray = useSelector((state) => state.board.boardArray);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
    console.log("initialized!");
  };

  // const makeBoardWithNoMineAt = ({ y, x }) => {
  //   console.log("makeBoardWithNoMineAt");
  //   do {
  //     initializeBoard();
  //   } while (boardArray[y][x].isMine);
  // };

  const onCellLeftClick = (e, cellInfo) => {
    // 첫 번째 클릭인데 mine일 경우
    if (isFirstClick && cellInfo.isMine) {
      // makeBoardWithNoMineAt(boardCell);
      // return;
    }
    dispatch(clickCell(cellInfo));
    setIsFirstClick(false);
  };

  const onCellRightClick = (e, cellInfo) => {
    e.preventDefault();
    const { isClicked } = cellInfo;
    if (isClicked) {
      return;
    }
    dispatch(flagCell(cellInfo));
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  return (
    <Container col={difficulty.width} row={difficulty.height}>
      {boardArray.map((boardRow, rowIndex) => {
        return boardRow.map((boardCell, colIndex) => {
          return (
            <Cell
              key={`cell_${rowIndex}_${colIndex}`}
              onClick={(e) => {
                onCellLeftClick(e, boardCell);
              }}
              onContextMenu={(e) => {
                onCellRightClick(e, boardCell);
              }}
              {...boardCell}
            >
              {getCellContent(boardCell)}
            </Cell>
          );
        });
      })}
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  grid-template-rows: repeat(${({ row }) => row}, 1fr);
  gap: 5px;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  background-color: #e6e6e6;
  user-select: none;

  &:hover {
    background-color: gray;
  }
  ${({ isClicked }) =>
    !isClicked &&
    `
    background-color: pink;
  `}
`;
