import styled from "styled-components";

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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 5px;

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

export const NoConversation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 40px;
    color: #726f6f;
    cursor: default;
    text-align: center;
  }
`;
