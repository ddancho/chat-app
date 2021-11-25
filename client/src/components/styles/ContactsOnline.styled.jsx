import styled from "styled-components";

export const Container = styled.div`
  flex: 3.5;
  padding: 10px;
  border-left: 1px solid #1877f2;
  overflow-y: scroll;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  border-bottom: 1px solid lightgray;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 70%;
  height: 34px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #1877f2;
  margin: 10px auto 30px auto;

  & > div {
    font-size: 10px;
    margin: 0 6px;
  }

  & > input {
    border: none;
    width: 80%;
    margin: auto 0;

    &:focus {
      outline: none;
    }
  }
`;
