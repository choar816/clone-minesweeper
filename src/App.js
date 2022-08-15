import { GameModeSwitch } from "components/GameModeSwitch";
import { MinesLeft } from "components/MinesLeft";
import { GameButton } from "components/GameButton";
import { Timer } from "components/Timer";
import { Board } from "components/Board";
import { DifficultyTab } from "components/DifficultyTab";
import styled from "styled-components";
import "antd/dist/antd.min.css";
import "./style.css";

function App() {
  return (
    <main>
      <GameModeSwitch />
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
