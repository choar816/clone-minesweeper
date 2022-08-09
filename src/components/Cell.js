import styled from "styled-components";

export const Cell = ({ isClicked, isFlagged, isMine, minesAround }) => {
  if (!isClicked) return <Div>🤫</Div>;
  if (isFlagged) return <Div>🚩</Div>;
  if (isMine) return <Div>💣</Div>;
  return <Div>{minesAround}</Div>;
};

const Div = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  user-select: none;

  &:hover {
    background-color: #e6e6e6;
  }
`;
