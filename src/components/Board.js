import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmptyBoard,
  plantMines,
  getMinesNeighbor,
  clickCell,
} from "../redux/slices/boardSlice";
import { getCellContent } from "./Cell";
import { changeDifficulty } from "../redux/slices/difficultySlice";
import styled from "styled-components";

export const Board = () => {
  const dispatch = useDispatch();
  const boardArray = useSelector((state) => state.board.boardArray);
  const difficulty = useSelector((state) => state.difficulty);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  return (
    <Container>
      {boardArray.map((boardRow, rowIndex) => {
        return boardRow.map((boardCell, colIndex) => {
          return (
            <>
              <Cell
                onClick={() => {
                  dispatch(clickCell(boardCell));
                }}
              >
                {getCellContent(boardCell)}
              </Cell>
              {colIndex === difficulty.width - 1 && <br />}
            </>
          );
        });
      })}
      <br />
      <button
        onClick={() => {
          initializeBoard(difficulty);
        }}
      >
        button
      </button>
    </Container>
  );
};

const Container = styled.section``;

const Cell = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  user-select: none;

  &:hover {
    background-color: #e6e6e6;
  }
`;
