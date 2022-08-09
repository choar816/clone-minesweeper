import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmptyBoard,
  plantMines,
  getMinesNeighbor,
  clickCell,
  flagCell,
} from "../redux/slices/boardSlice";
import styled from "styled-components";

const getCellContent = ({ isClicked, isFlagged, isMine, minesNeighbor }) => {
  // if (!isClicked) return "🤫";
  if (isFlagged) return "🚩";
  if (isMine) return "💣";
  if (minesNeighbor === 0) return "";
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

  const { height, width } = difficulty;
  const bfs = (positions) => {
    console.log("bfs");
    const dy = [1, -1, 0, 1, -1, 0, 1, -1];
    const dx = [0, 0, 1, 1, 1, -1, -1, -1];
    if (positions.length > 100) return;

    let nextPositions = [];
    // for (const { y, x } of positions) {
    //   if (boardArray[y][x].minesNeighbor === 0) {
    //     nextPositions.push({ y, x });
    //   }
    // }
    // bfs(nextPositions);

    while (positions.length) {
      let pos = positions.shift();
      for (let i = 0; i < 8; i++) {
        const ny = pos.y + dy[i];
        const nx = pos.x + dx[i];
        if (
          0 <= ny &&
          ny < height &&
          0 <= nx &&
          nx < width &&
          !boardArray[ny][nx].isClicked
        ) {
          dispatch(clickCell({ y: ny, x: nx }));
          if (boardArray[ny][nx].minesNeighbor === 0) {
            nextPositions.push({ y: ny, x: nx });
          }
        }
      }
    }
    console.log(nextPositions);
    bfs([...nextPositions]);
  };

  const onCellLeftClick = (e, cellInfo) => {
    const { y, x, isMine, minesNeighbor } = cellInfo;
    // 첫 번째 클릭인데 mine일 경우
    if (isFirstClick && isMine) {
      // makeBoardWithNoMineAt(boardCell);
      // return;
    }
    dispatch(clickCell({ y, x }));
    setIsFirstClick(false);
    if (isMine) {
      console.log("GAME OVER");
      return;
    }
    if (minesNeighbor === 0) {
      bfs([{ y, x }]);
    }
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
