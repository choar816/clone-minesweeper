import { useSelector, useDispatch } from "react-redux";
import { Board } from "./components/Board";
import { NumberDisplay } from "./components/NumberDisplay";
import styled from "styled-components";
import "./style.css";
import { DifficultyTab } from "./components/DifficultyTab";
import { GameButton } from "./components/GameButton";

function App() {
  return (
    <main>
      <GameContainer>
        <GameHeader>
          <NumberDisplay />
          <GameButton />
          <NumberDisplay />
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
