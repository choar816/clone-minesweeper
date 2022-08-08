import styled from "styled-components";
import { Board } from "./components/Board";
import { NumberDisplay } from "./components/NumberDisplay";
import "./style.css";

function App() {
  return (
    <main>
      <GameContainer>
        <GameHeader>
          <NumberDisplay />
          <NumberDisplay />
        </GameHeader>
        <Board />
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
  display: flex;
  justify-content: space-between;
`;
