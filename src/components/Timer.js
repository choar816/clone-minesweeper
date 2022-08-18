import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeconds } from "redux/slices/gameSlice";
import styled from "styled-components";

// 게임 우측 상단의 타이머 컴포넌트
export const Timer = () => {
  const dispatch = useDispatch();
  const { isStarted, isLost, isWon, seconds } = useSelector((state) => state.game);

  useEffect(() => {
    // 게임을 지거나, 이기거냐, 999초가 되면 시간이 멈춘다.
    if (isLost || isWon || seconds === 999) {
      return;
    }
    // 게임이 시작하지 않았을 때 타이머 값은 0이다.
    if (!isStarted) {
      dispatch(setSeconds(0));
      return;
    }
    // useEffect의 cleanup function을 이용해 1초마다 타이머 값을 1씩 증가시킨다.
    let countdown = setInterval(() => {
      dispatch(setSeconds(seconds + 1));
    }, 1000);
    return () => clearInterval(countdown);
  }, [isStarted, isLost, isWon, seconds]);

  return <Div>{seconds.toString().padStart(3, "0")}</Div>;
};

const Div = styled.div`
  width: 50px;
  border-radius: 3px;
  color: #000;
  background-color: #a4c4ff;
  text-align: center;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 3px;
`;
