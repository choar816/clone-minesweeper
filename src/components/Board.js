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
  const difficulty = useSelector((state) => state.difficulty);
  const boardArray = useSelector((state) => state.board.boardArray);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  return (
    <>
      <Container col={difficulty.width} row={difficulty.height}>
        {boardArray.map((boardRow, rowIndex) => {
          return boardRow.map((boardCell, colIndex) => {
            return (
              <Cell
                key={`cell_${rowIndex}_${colIndex}`}
                onClick={() => {
                  dispatch(clickCell(boardCell));
                }}
              >
                {getCellContent(boardCell)}
              </Cell>
            );
          });
        })}
      </Container>
      <button
        onClick={() => {
          initializeBoard(difficulty);
        }}
      >
        button
      </button>
    </>
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
  width: 30px;
  height: 30px;
  user-select: none;
  background-color: #e6e6e6;

  &:hover {
    background-color: gray;
  }
`;
