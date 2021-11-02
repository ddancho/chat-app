import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > h1 {
    font-weight: 200;
  }

  & > span {
    font-size: 22px;
    color: #42b72a;
    font-weight: 300;
  }
`;

export const Shadow = styled.div`
  margin-left: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 360px;
  height: 340px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #c2e7ba;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & > div input {
    width: 100%;
    height: 46px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
  }

  & > div input:focus {
    outline: none;
  }

  & > div button {
    width: 60%;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #42b72a;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const ErrMsg = styled.span`
  align-self: flex-start;
  margin: 10px 0;
  color: red;
  font-size: 12px;

  & > p[id="logEmailErrors"] {
    visibility: ${(props) => props.showMsg};
  }

  & > p[id="logPasswordErrors"] {
    visibility: ${(props) => props.showMsg};
  }

  & > p[id="logServerErrors"] {
    visibility: ${(props) => props.showMsg};
  }
`;

export const LogInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogTitle = styled.h1`
  font-weight: 600;
  color: #42b72a;
  border-bottom: 1px solid green;
  margin-bottom: 5px;
  visibility: ${(props) => props.showMsg};
`;

export const LogMsg = styled.p`
  font-size: 12;
  font-weight: 20;
  visibility: ${(props) => props.showMsg};
`;
