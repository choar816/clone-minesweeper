import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const Timer = () => {
  const { isStarted } = useSelector((state) => state.game);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!isStarted) return;
    let countdown = setInterval(() => {
      setSeconds(parseInt(seconds) + 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [isStarted, seconds]);

  return <Div>{seconds.toString().padStart(3, "0")}</Div>;
};

const Div = styled.div`
  width: 50px;
  text-align: center;
`;
