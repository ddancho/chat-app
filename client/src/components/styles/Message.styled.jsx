import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Top = styled.div`
  display: flex;
  margin-top: 20px;

  & > p {
    padding: 10px;
    border-radius: 10px;
    background-color: ${({ own }) => (own ? "#ccd3dd" : "#4276b9")};
    color: ${({ own }) => (own ? "black" : "white")};
    max-width: 300px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;

  & > p {
    font-size: 14px;
    font-weight: 200;
    margin-right: 4px;
  }

  & > time {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const BorderLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: linear-gradient(to right, lightgray, #f0f2f5);
`;
