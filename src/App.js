import { Board } from "./components/Board";
import { MinesLeft } from "./components/MinesLeft";
import { Timer } from "./components/Timer";
import { DifficultyTab } from "./components/DifficultyTab";
import { GameButton } from "./components/GameButton";
import styled from "styled-components";
import "./style.css";

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
  border: 1px solid #000;
  padding: 10px;
`;

const GameHeader = styled.article`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
