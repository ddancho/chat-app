import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

export const Menu = styled.div`
  flex: 3.5;
  padding: 10px;
  border-right: 1px solid #1877f2;

  & > div {
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

export const Top = styled.div`
  overflow-y: scroll;
  padding-right: 10px;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const CreateConversation = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 10px;
  padding-bottom: 30px;
  border-bottom: 1px solid lightgray;

  & > p {
    margin-bottom: 10px;
    font-weight: 300;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    input {
      width: 60%;
      height: 28px;
      padding-left: 10px;
      margin-right: 10px;
      border-radius: 10px;
      border: 1px solid gray;
    }

    input:focus {
      outline: none;
    }

    button {
      width: 48px;
      height: 24px;
      border: none;
      border-radius: 5px;
      background-color: #42b72a;
      color: white;
      cursor: pointer;
    }
  }
`;

export const Contacts = styled.div`
  flex: 3.5;
  padding: 10px;
  border-left: 1px solid #1877f2;

  & > div {
    height: 100%;
  }
`;
