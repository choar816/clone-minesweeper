import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmptyBoard, getMinesNeighbor, plantMines } from "../redux/slices/boardSlice";
import { changeDifficulty } from "../redux/slices/difficultySlice";
import { resetGame } from "../redux/slices/gameSlice";
import styled from "styled-components";

export const DifficultyTab = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const DIFFICULTY_STRINGS = ["beginner", "intermediate", "expert"];
  const [difficultyIndex, setDifficultyIndex] = useState(0);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
    dispatch(resetGame());
  };

  useEffect(() => {
    initializeBoard();
  }, [difficulty]);

  return (
    <Container difficultyIndex={difficultyIndex}>
      {DIFFICULTY_STRINGS.map((difficultyString, index) => {
        return (
          <button
            key={difficultyString}
            onClick={() => {
              setDifficultyIndex(index);
              dispatch(changeDifficulty(difficultyString));
              initializeBoard();
            }}
          >
            {difficultyString.toUpperCase()}
          </button>
        );
      })}
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  gap: 5px;
  button {
    background-color: #474747;
    color: #fff;
    border: none;
    padding: 3px 5px;
    border-radius: 3px;

    ${({ difficultyIndex }) => `
    &:nth-child(${difficultyIndex + 1}) {
      background-color: #4687ff;
    }`}
  }
`;
