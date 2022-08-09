import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmptyBoard,
  plantMines,
  getMinesNeighbor,
  revealCell,
  handleCellRightClick,
} from "../redux/slices/boardSlice";
import { loseGame, startGame } from "../redux/slices/gameSlice";
import styled from "styled-components";

const getCellContent = ({ isRevealed, isFlagged, isQuestionable, isMine, minesNeighbor }) => {
  // if (!isRevealed) return "🤫";
  if (isFlagged) return "🚩";
  if (isQuestionable) return "?";
  if (isMine) return "💣";
  if (minesNeighbor === 0) return "";
  return `${minesNeighbor}`;
};

export const Board = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const boardArray = useSelector((state) => state.board.boardArray);
  const { isStarted, isLost, isWon } = useSelector((state) => state.game);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
  };

  // const makeBoardWithNoMineAt = ({ y, x }) => {
  //   console.log("makeBoardWithNoMineAt");
  //   do {
  //     initializeBoard();
  //   } while (boardArray[y][x].isMine);
  // };

  const { height, width } = difficulty;
  const bfs = (position) => {
    const dy = [1, -1, 0, 1, -1, 0, 1, -1];
    const dx = [0, 0, 1, 1, 1, -1, -1, -1];

    const queue = [position];
    const visited = new Set([JSON.stringify(position)]);

    while (queue.length) {
      let { y, x } = queue.shift();

      if (boardArray[y][x].isMine || boardArray[y][x].isFlagged) continue;
      dispatch(revealCell({ y, x }));
      if (boardArray[y][x].minesNeighbor !== 0) continue;

      for (let i = 0; i < 8; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];
        const next_pos = { y: ny, x: nx };
        if (0 <= ny && ny < height && 0 <= nx && nx < width && !visited.has(JSON.stringify(next_pos))) {
          queue.push(next_pos);
          visited.add(JSON.stringify(next_pos));
        }
      }
    }
  };

  const onCellLeftClick = (e, cellInfo) => {
    const { y, x, isMine, minesNeighbor } = cellInfo;
    if (isLost || isWon) {
      return;
    }
    // 첫 번째 클릭일 경우
    if (!isStarted) {
      dispatch(startGame());
      // makeBoardWithNoMineAt(boardCell);
      // return;
    }
    dispatch(revealCell({ y, x }));
    // setIsFirstClick(false);
    if (isMine) {
      console.log("GAME OVER");
      dispatch(loseGame());
      return;
    }
    // 빈칸을 클릭했을 경우 bfs로 빈칸 및 인접한 칸을 모두 reveal함
    if (minesNeighbor === 0) {
      bfs({ y, x });
    }
  };

  const onCellRightClick = (e, cellInfo) => {
    e.preventDefault();
    if (isLost || isWon || cellInfo.isRevealed) {
      return;
    }
    dispatch(handleCellRightClick(cellInfo));
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  return (
    <Container col={width} row={height}>
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

  ${({ isRevealed }) =>
    !isRevealed &&
    `
    background-color: pink;
  `}
`;
