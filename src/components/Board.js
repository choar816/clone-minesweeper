import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmptyBoard,
  plantMines,
  getMinesNeighbor,
  revealCell,
  handleCellRightClick,
} from "../redux/slices/boardSlice";
import { loseGame, startGame, winGame } from "../redux/slices/gameSlice";
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
  const { height, width } = difficulty;
  const { boardArray, revealedCells } = useSelector((state) => state.board);
  const { isStarted, isLost, isWon } = useSelector((state) => state.game);

  const bfs = (position) => {
    const dy = [1, -1, 0, 1, -1, 0, 1, -1];
    const dx = [0, 0, 1, 1, 1, -1, -1, -1];

    const queue = [position];
    const visited = new Set([JSON.stringify(position)]);

    while (queue.length) {
      let { y, x } = queue.shift();
      const { isMine, isFlagged, isQuestionable, isRevealed, minesNeighbor } = boardArray[y][x];
      if (isMine || isFlagged || isQuestionable || isRevealed) continue;
      dispatch(revealCell({ y, x }));
      if (minesNeighbor !== 0) continue;

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

  const onCellLeftClick = (boardCell) => {
    const { y, x, isMine, isRevealed, isFlagged, isQuestionable, minesNeighbor } = boardCell;

    // 게임이 끝난 경우(지거나 이긴 경우) or cell이 이미 눌렸거나 깃발 또는 물음표인 경우 :
    // cell을 눌러도 아무 효과가 없음
    if (isLost || isWon || isRevealed || isFlagged || isQuestionable) {
      return;
    }

    // 첫 번째 클릭일 경우
    if (!isStarted) {
      if (isMine) {
        // TODO: Fix error
        // do {
        //   initializeBoard();
        // } while (boardArray[y][x].isMine);
        // return;
      }
      dispatch(startGame());
    }

    // 지뢰가 없고, 이웃한 지뢰도 없는 칸을 클릭했을 경우 :
    // bfs로 빈칸 및 인접한 칸을 모두 reveal함
    if (!isMine && minesNeighbor === 0) {
      bfs({ y, x });
    }
    // 지뢰가 있거나, 이웃한 지뢰가 있는 칸 클릭 : 해당 칸만 reveal
    else {
      dispatch(revealCell(boardCell));
      // 지뢰를 클릭했을 경우 : 게임오버
      if (isMine) {
        dispatch(loseGame());
      }
    }
  };

  const onCellRightClick = (cellInfo) => {
    if (isLost || isWon || cellInfo.isRevealed) {
      return;
    }
    dispatch(handleCellRightClick(cellInfo));
  };

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
  };

  const checkWin = () => {
    if (revealedCells + difficulty.mine === height * width) {
      dispatch(winGame());
    }
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    checkWin();
  }, [revealedCells]);

  return (
    <Container col={width} row={height}>
      {boardArray.map((boardRow, rowIndex) => {
        return boardRow.map((boardCell, colIndex) => {
          return (
            <Cell
              key={`cell_${rowIndex}_${colIndex}`}
              onClick={() => {
                onCellLeftClick(boardCell);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                onCellRightClick(boardCell);
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
  background-color: #caddff;

  ${({ isRevealed }) =>
    !isRevealed &&
    `
    background-color: #ccc;
  `}
`;
