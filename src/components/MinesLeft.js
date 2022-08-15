import { useSelector } from "react-redux";
import styled from "styled-components";

// 게임 좌측 상단의 '남은 지뢰' 컴포넌트
export const MinesLeft = () => {
  const { mine } = useSelector((state) => state.difficulty);
  const { flaggedCells } = useSelector((state) => state.board);
  const minesLeft = mine - flaggedCells;
  
  if (minesLeft < 0) return <Div>{minesLeft}</Div>;
  return <Div>{(mine - flaggedCells).toString().padStart(3, "0")}</Div>;
};

const Div = styled.div`
  width: 50px;
  border-radius: 3px;
  color: #000;
  background-color: #a4c4ff;
  text-align: center;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 3px;
`;
