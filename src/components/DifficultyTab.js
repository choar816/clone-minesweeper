import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createEmptyBoard, getMinesNeighbor, plantMines } from "../redux/slices/boardSlice";
import { changeDifficulty } from "../redux/slices/difficultySlice";

export const DifficultyTab = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);

  const DIFFICULTIES = ["beginner", "intermediate", "expert"];
  const [difficultyIndex, setDifficultyIndex] = useState(0);

  return (
    <Container difficultyIndex={difficultyIndex}>
      {DIFFICULTIES.map((difficultyString, index) => {
        return (
          <button
            key={difficultyString}
            onClick={() => {
              setDifficultyIndex(index);
              dispatch(changeDifficulty(difficultyString));
              console.log(difficulty);
              dispatch(createEmptyBoard(difficulty));
              dispatch(plantMines(difficulty));
              dispatch(getMinesNeighbor(difficulty));
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
  button {
    border: 1px solid black;
    background-color: paleturquoise;

    ${({ difficultyIndex }) => `
    &:nth-child(${difficultyIndex + 1}) {
      background-color: gray;
    }`}
  }
`;
