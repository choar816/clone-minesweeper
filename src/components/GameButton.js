import { useDispatch, useSelector } from "react-redux";
import {
  createEmptyBoard,
  getMinesNeighbor,
  plantMines,
} from "../redux/slices/boardSlice";

export const GameButton = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);

  const initializeBoard = () => {
    dispatch(createEmptyBoard(difficulty));
    dispatch(plantMines(difficulty));
    dispatch(getMinesNeighbor(difficulty));
    console.log("initialized!");
  };

  return <button onClick={initializeBoard}>button</button>;
};
