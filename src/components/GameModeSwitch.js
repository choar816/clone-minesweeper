import { useDispatch } from "react-redux";
import { setIsGameModeDevelop } from "redux/slices/gameSlice";
import { Switch } from "antd";
import "antd/dist/antd.min.css";

// 게임 상단 개발모드 on/off 스위치 컴포넌트
export const GameModeSwitch = () => {
  const dispatch = useDispatch();

  return (
    <div>
      개발모드 스위치
      <Switch onChange={(checked) => dispatch(setIsGameModeDevelop(checked))} style={{ marginLeft: 10 }} />
    </div>
  );
};
