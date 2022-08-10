import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmptyBoard, getMinesNeighbor, plantMines } from "../redux/slices/boardSlice";
import { resetGame } from "../redux/slices/gameSlice";

export const GameButton = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);
  const { isLost, isWon } = useSelector((state) => state.game);

  const [emoji, setEmoji] = useState("🙂");
  useEffect(() => {
    if (isLost) {
      setEmoji("😵");
      return;
    }
    if (isWon) {
      setEmoji("🥳");
      return;
    }
    setEmoji("🙂");
  }, [isLost, isWon]);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
    dispatch(resetGame());
  };

  return <button onClick={initializeBoard}>{emoji}</button>;
};
