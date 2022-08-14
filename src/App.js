import { useDispatch } from "react-redux";
import { changeGameMode } from "./redux/slices/gameSlice";
import { Board } from "./components/Board";
import { MinesLeft } from "./components/MinesLeft";
import { Timer } from "./components/Timer";
import { DifficultyTab } from "./components/DifficultyTab";
import { GameButton } from "./components/GameButton";
import styled from "styled-components";
import { Switch } from "antd";
import "antd/dist/antd.min.css";
import "./style.css";

function App() {
  const dispatch = useDispatch();

  return (
    <main>
      <div>
        개발모드 스위치
        <Switch onChange={(checked) => dispatch(changeGameMode(checked))} style={{ marginLeft: 10 }} />
      </div>
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
