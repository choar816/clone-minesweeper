import { Fireworks } from "@fireworks-js/react";
import { useDispatch, useSelector } from "react-redux";
import { createEmptyBoard, getMinesNeighbor, plantMines } from "../redux/slices/boardSlice";
import { resetGame } from "../redux/slices/gameSlice";

export const GameButton = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const { isLost, isWon, isClicking } = useSelector((state) => state.game);

  const getEmoji = ({ isLost, isWon, isClicking }) => {
    if (isLost) return "😵";
    if (isWon) return "🥳";
    if (isClicking) return "😮";
    return "🙂";
  };

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
    dispatch(resetGame());
  };

  return (
    <>
      <button onClick={initializeBoard} style={{ padding: "2px 6px 0 4px" }}>
        {getEmoji({ isLost, isWon, isClicking })}
      </button>
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
