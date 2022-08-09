import { useSelector, useDispatch } from "react-redux";
import { Board } from "./components/Board";
import { NumberDisplay } from "./components/NumberDisplay";
import styled from "styled-components";
import "./style.css";
import { DifficultyTab } from "./components/DifficultyTab";

function App() {
  return (
    <main>
      <GameContainer>
        <GameHeader>
          <NumberDisplay />
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
  border: 1px solid #000;
  padding: 10px;
`;

const GameHeader = styled.article`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;
