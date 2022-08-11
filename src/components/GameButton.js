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

  return <button onClick={initializeBoard}>{getEmoji({ isLost, isWon, isClicking })}</button>;
};
