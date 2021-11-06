import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 52px);
`;

export const Menu = styled.div`
  flex: 3.5;

  & > div {
    padding: 10px;
    height: 100%;
  }
`;

export const Chat = styled.div`
  flex: 5;
  padding: 10px;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`;

export const Top = styled.div`
  overflow-y: scroll;
  padding-right: 10px;
`;

export const Bottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > textarea {
    width: 80%;
    height: 90px;
    padding: 10px;
  }

  & > button {
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #42b72a;
    cursor: pointer;
    color: white;
  }
`;

export const Contacts = styled.div`
  flex: 3.5;

  & > div {
    padding: 10px;
    height: 100%;
  }
`;
