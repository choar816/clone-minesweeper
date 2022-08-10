import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { customDifficulty } from "../redux/slices/difficultySlice";

export const Modal = ({ isModalOn, setIsModalOn }) => {
  const dispatch = useDispatch();

  const DIFFICULTY_PROPERTIES = ["width", "height", "mine"];
  const [difficultyObject, setDifficultyObject] = useState({
    width: "",
    height: "",
    mine: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (e) => {
    setDifficultyObject((obj) => {
      return { ...obj, [e.target.name]: parseInt(e.target.value, 10) };
    });
    // console.log(difficultyObject);
  };

  const onButtonClick = () => {
    const { width, height, mine } = difficultyObject;
    if (isNaN(width) || isNaN(height) || isNaN(mine)) {
      setErrorMessage("모든 칸에 숫자를 입력하세요.");
      return;
    }
    if (width < 0 || height < 0 || mine < 0) {
      setErrorMessage("음수를 입력하면 안됩니다.");
      return;
    }
    if (mine >= width * height) {
      setErrorMessage("지뢰는 width * height 값보다 적게 있어야 합니다.");
      return;
    }
    if (mine === 0) {
      setErrorMessage("지뢰는 한 개 이상 있어야 합니다.");
      return;
    }
    dispatch(customDifficulty({ width, height, mine }));
    setIsModalOn(false);
  };

  return (
    <>
      <Background isModalOn={isModalOn} onClick={() => setIsModalOn(false)} />
      <Section isModalOn={isModalOn}>
        <h2>난이도 직접 설정하기</h2>
        {DIFFICULTY_PROPERTIES.map((property) => (
          <>
            <label htmlFor={property}>{property}</label>
            <input name={property} id={property} onChange={onInputChange} />
          </>
        ))}
        {errorMessage.length !== 0 && <p className="error">{errorMessage}</p>}
        <button onClick={onButtonClick}>설정</button>
      </Section>
    </>
  );
};

const Section = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  background-color: #fff;
  z-index: 10;
  h2,
  p {
    margin: 0;
  }
  p {
    color: red;
  }
  input {
    padding: 5px;
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
