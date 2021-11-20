import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;

  & > div {
    position: relative;
    margin-right: 12px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid white;
    }

    div {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: limegreen;
      background-color: ${({ isOn }) => (isOn ? "limegreen" : "red")};
      top: 0;
      right: 0;
      margin: 0;
    }
  }
`;
