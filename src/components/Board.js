import { useSelector, useDispatch } from "react-redux";
import {
  createEmptyBoard,
  plantMines,
  clickCell,
} from "../redux/slices/boardSlice";
import { getCellContent } from "./Cell";
import styled from "styled-components";
import { useEffect } from "react";

const DIFFICULTY = {
  beginner: {
    width: 8,
    height: 8,
    mine: 10,
  },
  intermediate: {
    width: 16,
    height: 16,
    mine: 40,
  },
  expert: {
    width: 32,
    height: 16,
    mine: 99,
  },
};

export const Board = () => {
  const dispatch = useDispatch();
  const boardArray = useSelector((state) => state.board.boardArray);

  useEffect(() => {
    dispatch(createEmptyBoard(DIFFICULTY.beginner));
  }, []);

  return (
    <Container>
      {boardArray.map((boardRow, rowIndex) => {
        return boardRow.map((boardCell, colIndex) => {
          return (
            <>
              <Cell
                onClick={() => {
                  console.log("clicked cell");
                  dispatch(clickCell(boardCell));
                }}
              >
                {getCellContent(boardCell)}
              </Cell>
              {colIndex === DIFFICULTY.beginner.width - 1 && <br />}
            </>
          );
        });
      })}
      <br />
      <button
        onClick={() => {
          dispatch(plantMines(DIFFICULTY.beginner));
        }}
      >
        plant mines
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
