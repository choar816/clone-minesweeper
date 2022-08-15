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
  flagAllMines,
  indicateFalseAlarms,
} from "redux/slices/boardSlice";
import { checkIsClicking, loseGame, startGame, winGame } from "redux/slices/gameSlice";
import { getCellContent, getCellTextColor } from "utils/board";
import styled from "styled-components";

export const Board = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const { isGameModeDevelop } = useSelector((state) => state.game);
  const { height, width } = difficulty;
  const { boardArray, revealedCells } = useSelector((state) => state.board);
  const { isStarted, isLost, isWon } = useSelector((state) => state.game);

  // 게임판을 초기화하는 함수
  // 난이도에 맞게 빈 2차원 배열을 만들고,
  // 지뢰를 난이도에 맞게 심어주고,
  // 이웃한 지뢰 수를 지뢰가 없는 모든 칸에 적어준다.
  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor());
  };

  // 게임을 이겼는지 확인하는 함수
  const checkWin = () => {
    // 연 칸의 개수 + 지뢰의 개수 = 전체 칸의 개수인 경우
    // 게임을 이기고, 모든 지뢰 칸에 깃발이 꼽힌다.
    if (revealedCells + difficulty.mine === height * width) {
      dispatch(winGame());
      dispatch(flagAllMines());
    }
  };

  // 맨 처음에 게임판을 초기화해준다.
  useEffect(() => {
    initializeBoard();
  }, []);

  // 칸을 열 때마다 이겼는지 확인한다.
  useEffect(() => {
    checkWin();
  }, [revealedCells]);

  // 칸 위에서 좌클릭을 했을 떄 실행되는 함수
  const onCellLeftClick = (boardCell) => {
    let { y, x, isMine, isRevealed, isFlagged, isQuestionable, minesNeighbor } = boardCell;

    // 게임이 끝난 경우(지거나 이긴 경우) or 칸이 이미 열렸거나 깃발 또는 물음표인 경우 :
    // 칸을 눌러도 아무 효과가 없음
    if (isLost || isWon || isRevealed || isFlagged || isQuestionable) {
      return;
    }

    // 첫 번째 클릭일 경우
    if (!isStarted) {
      // 지뢰를 누른 경우 해당 칸의 지뢰를 다른 칸으로 옮기고, 이웃한 지뢰 수 다시 계산한 뒤 게임 시작
      if (isMine) {
        dispatch(moveOneMine({ y, x }));
        dispatch(getMinesNeighbor());
        isMine = false;
      }
      dispatch(startGame());
    }

    // 지뢰가 없고, 이웃한 지뢰도 없는 칸을 클릭했을 경우 :
    // bfs로 빈칸 및 인접한 칸을 모두 연다.
    if (!isMine && minesNeighbor === 0) {
      dispatch(bfsCells({ y, x }));
    }
    // 지뢰가 있거나, 이웃한 지뢰가 있는 칸 클릭 : 해당 칸만 연다.
    else {
      dispatch(revealCell(boardCell));
      // 지뢰를 클릭했을 경우 : 게임오버
      if (isMine) {
        dispatch(loseGame());
        dispatch(revealAllMines());
        dispatch(indicateBust({ y, x }));
        dispatch(indicateFalseAlarms());
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
      // 게임판에 마우스가 눌려있는지에 따라 게임버튼 이모지를 다르게 설정하기 위한 부분
      onMouseDown={() => {
        dispatch(checkIsClicking(true));
      }}
      onMouseUp={() => {
        dispatch(checkIsClicking(false));
      }}
    >
      {/* 2차원 배열인 게임판을 화면에 표시하는 부분 */}
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
              {getCellContent(boardCell, isGameModeDevelop)}
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
