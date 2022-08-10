import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const Timer = () => {
  const { isStarted, isLost, isWon } = useSelector((state) => state.game);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (isLost || isWon || seconds === 999) {
      return;
    }
    if (!isStarted) {
      setSeconds(0);
      return;
    }
    let countdown = setInterval(() => {
      setSeconds(seconds + 1);
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
