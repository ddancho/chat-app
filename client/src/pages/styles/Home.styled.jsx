import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

export const Contacts = styled.div`
  flex: 3.5;
  padding: 10px;
  border-left: 1px solid #1877f2;

  & > div {
    height: 100%;
  }
`;
