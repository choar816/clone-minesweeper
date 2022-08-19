import { useState } from "react";
import { useDispatch } from "react-redux";
import { customDifficulty } from "redux/slices/difficultySlice";
import styled from "styled-components";
import { Button, Input } from "antd";
import "antd/dist/antd.min.css";

// 게임 난이도를 커스텀할 때 사용되는 모달 컴포넌트
export const CustomDifficultyModal = ({ isModalOn, setIsModalOn }) => {
  const dispatch = useDispatch();

  const DIFFICULTY_PROPERTIES = ["width", "height", "mine"];
  const [difficultyState, setDifficultyState] = useState({
    width: "",
    height: "",
    mine: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (e) => {
    setDifficultyState((obj) => {
      return { ...obj, [e.target.name]: parseInt(e.target.value, 10) };
    });
  };

  // 난이도 커스텀 모달에서 '설정'을 눌렀을 때 실행되는 함수
  // 너비, 높이, 지뢰수 입력 값을 계산해 적절하지 않을 시 에러 메시지를 띄우고 난이도를 바꾸지 않는다.
  // 적절한 경우에만 난이도를 그대로 설정하고 모달을 닫는다.
  const onButtonClick = () => {
    const { width, height, mine } = difficultyState;
    if (isNaN(width) || isNaN(height) || isNaN(mine)) {
      setErrorMessage("모든 칸에 숫자를 입력하세요.");
      return;
    }
    if (width < 0 || height < 0 || mine < 0) {
      setErrorMessage("음수를 입력하면 안됩니다.");
      return;
    }
    if (width > 100 || height > 100) {
      setErrorMessage("width, height는 100을 초과할 수 없습니다.");
      return;
    }
    if (mine >= width * height) {
      setErrorMessage(`지뢰는 width * height 값(${width * height})보다 적게 있어야 합니다.`);
      return;
    }
    if (mine === 0) {
      setErrorMessage("지뢰는 한 개 이상 있어야 합니다.");
      return;
    }
    setErrorMessage("");
    dispatch(customDifficulty({ width, height, mine }));
    setIsModalOn(false);
  };

  return (
    <>
      <Background isModalOn={isModalOn} onClick={() => setIsModalOn(false)} />
      <Section isModalOn={isModalOn}>
        <h3>난이도 직접 설정하기</h3>
        {DIFFICULTY_PROPERTIES.map((property) => (
          <div key={`dp_${property}`}>
            <label htmlFor={property}>{property}</label>
            <Input name={property} id={property} onChange={onInputChange} />
          </div>
        ))}
        {errorMessage.length !== 0 && <p className="error">{errorMessage}</p>}
        <Button type="primary" onClick={onButtonClick}>
          설정
        </Button>
      </Section>
    </>
  );
};

const Section = styled.section`
  width: 280px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px 5px;
  z-index: 10;

  h3 {
    margin: 0;
    text-align: center;
  }
  p {
    margin: 0;
    color: red;
    font-size: 0.9rem;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    label {
      width: 70px;
    }
    input {
      width: 120px;
    }
  }
  ${({ isModalOn }) => !isModalOn && `display: none;`}
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  ${({ isModalOn }) => !isModalOn && `display: none;`}
`;
