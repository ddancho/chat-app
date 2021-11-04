import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
`;

export const Content = styled.div`
  width: 30vw;
  height: auto;
  background: white;
  border-radius: 10px;
  border: 1px solid #c2e7ba;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;

  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: ${(status) => ("error" ? "red" : "green")};
      text-transform: capitalize;
      margin-bottom: 10px;
    }

    & > span svg {
      cursor: pointer;
    }
  }

  main {
    margin: 10px;
  }
`;
