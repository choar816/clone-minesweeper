import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmptyBoard, getMinesNeighbor, plantMines } from "redux/slices/boardSlice";
import { chooseDifficulty } from "redux/slices/difficultySlice";
import { resetGame } from "redux/slices/gameSlice";
import { CustomDifficultyModal } from "./CustomDifficultyModal";
import styled from "styled-components";

// beginner, intermediate, expert, custom 중 난이도를 선택하는 탭 컴포넌트
export const DifficultyTab = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const DIFFICULTY_STRINGS = ["beginner", "intermediate", "expert", "custom"];
  const [difficultyIndex, setDifficultyIndex] = useState(0);
  const [isModalOn, setIsModalOn] = useState(false);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor());
    dispatch(resetGame());
  };

  // 난이도가 달라지면 게임판을 달라진 난이도로 바꾸고 게임 진행상태를 리셋한다.
  useEffect(() => {
    initializeBoard();
  }, [difficulty]);

  // 난이도 버튼을 눌렀을 떄 실행되는 함수
  const onClickDifficulty = ({ difficultyString, index }) => {
    setDifficultyIndex(index);
    if (difficultyString === "custom") {
      setIsModalOn(true);
    } else {
      dispatch(chooseDifficulty(difficultyString));
    }
    initializeBoard();
  };

  return (
    <>
      <Container difficultyIndex={difficultyIndex}>
        {DIFFICULTY_STRINGS.map((difficultyString, index) => {
          return (
            <button key={difficultyString} onClick={() => onClickDifficulty({ difficultyString, index })}>
              {difficultyString.toUpperCase()}
            </button>
          );
        })}
      </Container>
      <CustomDifficultyModal isModalOn={isModalOn} setIsModalOn={setIsModalOn} />
    </>
  );
};

const Container = styled.article`
  display: flex;
  gap: 5px;
  button {
    background-color: #474747;
    color: #fff;
    border: none;
    padding: 2px 10px;
    border-radius: 3px;
    ${({ difficultyIndex }) => `
    &:nth-child(${difficultyIndex + 1}) {
      background-color: #4687ff;
    }`}
  }
`;
