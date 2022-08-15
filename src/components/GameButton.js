import { useDispatch, useSelector } from "react-redux";
import { Fireworks } from "@fireworks-js/react";
import { createEmptyBoard, getMinesNeighbor, plantMines } from "redux/slices/boardSlice";
import { resetGame } from "redux/slices/gameSlice";

// 게임 상단 가운데에 있는 버튼 컴포넌트
export const GameButton = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const { isLost, isWon, isClicking } = useSelector((state) => state.game);

  // 지면 😵, 이기면 🥳, 게임판을 클릭중이면 😮, 그외의 경우에는 🙂로 표시한다.
  const getEmoji = ({ isLost, isWon, isClicking }) => {
    if (isLost) return "😵";
    if (isWon) return "🥳";
    if (isClicking) return "😮";
    return "🙂";
  };

  // 버튼을 누르면 게임판을 새로 만들고, 게임 진행상태를 리셋한다.
  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor());
    dispatch(resetGame());
  };

  return (
    <>
      <button onClick={initializeBoard} style={{ padding: "2px 6px 0 4px" }}>
        {getEmoji({ isLost, isWon, isClicking })}
      </button>
      {/* 이겼을 때 불꽃놀이 효과를 주는 부분 */}
      {isWon && (
        <div style={{ position: "absolute" }} onClick={initializeBoard}>
          <Fireworks
            options={{ opacity: 0.5 }}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "fixed",
              background: "rgba(0, 0, 0, 0)",
            }}
          />
        </div>
      )}
    </>
  );
};
