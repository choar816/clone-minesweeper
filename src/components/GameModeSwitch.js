import { useDispatch } from "react-redux";
import { setIsGameModeDevelop } from "redux/slices/gameSlice";
import { Switch } from "antd";
import "antd/dist/antd.min.css";
import styled from "styled-components";

// 게임 상단 개발모드 on/off 스위치 컴포넌트
export const GameModeSwitch = () => {
  const dispatch = useDispatch();

  return (
    <Div>
      Development Mode Switch
      <Switch onChange={(checked) => dispatch(setIsGameModeDevelop(checked))} style={{ marginLeft: 10 }} />
    </Div>
  );
};

const Div = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.4);
  padding: 2px 10px;
`;
