import { useSelector, useDispatch } from "react-redux";
import { store } from "../store";
import styled from "styled-components";
import { createEmptyBoard } from "../boardSlice";
import { Cell } from "./Cell";

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

  return (
    <Container>
      {boardArray.map((boardRow, rowIndex) => {
        return boardRow.map((boardCell, colIndex) => {
          return (
            <>
              <Cell {...boardCell} />
              {colIndex === DIFFICULTY.beginner.width - 1 && <br />}
            </>
          );
        });
      })}
      <br />
      <button
        onClick={() => {
          dispatch(createEmptyBoard(DIFFICULTY.beginner));
          console.log(boardArray);
        }}
      >
        create empty board
      </button>
    </Container>
  );
};

const Container = styled.section``;
