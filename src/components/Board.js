import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmptyBoard,
  plantMines,
  getMinesNeighbor,
  moveOneMine,
  revealCell,
  revealAllMines,
  indicateBust,
  handleCellRightClick,
  bfsCells,
} from "../redux/slices/boardSlice";
import { checkIsClicking, loseGame, startGame, winGame } from "../redux/slices/gameSlice";
import styled from "styled-components";

const getCellTextColor = (minesNeighbor) => {
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

export const Board = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const { isGameModeDevelop } = useSelector((state) => state.game);
  const { height, width } = difficulty;
  const { boardArray, revealedCells } = useSelector((state) => state.board);
  const { isStarted, isLost, isWon } = useSelector((state) => state.game);

  const getCellContent = ({ isRevealed, isFlagged, isQuestionable, isMine, minesNeighbor }) => {
    if (isFlagged) return "🚩";
    if (isQuestionable) return "?";
    if (!isGameModeDevelop) {
      if (!isRevealed) return "";
    }
    if (isMine) return "💣";
    if (minesNeighbor === 0) return "";
    return `${minesNeighbor}`;
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

  const onCellLeftClick = (boardCell) => {
    let { y, x, isMine, isRevealed, isFlagged, isQuestionable, minesNeighbor } = boardCell;

    // 게임이 끝난 경우(지거나 이긴 경우) or cell이 이미 눌렸거나 깃발 또는 물음표인 경우 :
    // cell을 눌러도 아무 효과가 없음
    if (isLost || isWon || isRevealed || isFlagged || isQuestionable) {
      return;
    }

    // 첫 번째 클릭일 경우
    if (!isStarted) {
      // 지뢰를 누른 경우 해당 칸의 지뢰를 다른 칸으로 옮김
      if (isMine) {
        dispatch(moveOneMine({ y, x, height, width }));
        dispatch(getMinesNeighbor(difficulty));
        isMine = false;
        minesNeighbor = boardArray[y][x].minesNeighbor;
      }
      dispatch(startGame());
    }

    // 지뢰가 없고, 이웃한 지뢰도 없는 칸을 클릭했을 경우 :
    // bfs로 빈칸 및 인접한 칸을 모두 reveal함
    if (!isMine && minesNeighbor === 0) {
      dispatch(bfsCells({ y, x, height, width }));
    }
    // 지뢰가 있거나, 이웃한 지뢰가 있는 칸 클릭 : 해당 칸만 reveal
    else {
      dispatch(revealCell(boardCell));
      // 지뢰를 클릭했을 경우 : 게임오버
      if (isMine) {
        dispatch(loseGame());
        dispatch(indicateBust({ y, x }));
        dispatch(revealAllMines({ height, width }));
      }
    }
  };

  const onCellRightClick = (cellInfo) => {
    if (isLost || isWon || cellInfo.isRevealed) {
      return;
    }
    dispatch(handleCellRightClick(cellInfo));
  };

  return (
    <Container
      col={width}
      row={height}
      onMouseDown={() => {
        dispatch(checkIsClicking(true));
      }}
      onMouseUp={() => {
        dispatch(checkIsClicking(false));
      }}
    >
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
`;

const Cell = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 1rem;
  background-color: #ccc;
  overflow: hidden;

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
