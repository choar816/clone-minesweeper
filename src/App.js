import { Board } from "./components/Board";
import { MinesLeft } from "./components/MinesLeft";
import { Timer } from "./components/Timer";
import { DifficultyTab } from "./components/DifficultyTab";
import { GameButton } from "./components/GameButton";
import styled from "styled-components";
import "./style.css";
import { Modal } from "./components/Modal";

function App() {
  return (
    <main>
      <GameContainer>
        <GameHeader>
          <MinesLeft />
          <GameButton />
          <Timer />
        </GameHeader>
        <Board />
        <DifficultyTab />
      </GameContainer>
    </main>
  );
}

export default App;

const GameContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px 5px;
  user-select: none;
`;

const GameHeader = styled.article`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
