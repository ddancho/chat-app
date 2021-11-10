import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ own }) => (own ? "flex-end" : "flex-start")};
`;

export const Top = styled.div`
  display: flex;
  margin-top: 20px;

  & > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  & > p {
    padding: 10px;
    border-radius: 20px;
    background-color: ${({ own }) => (own ? "#ccd3dd" : "#1877f2")};
    color: ${({ own }) => (own ? "black" : "white")};
    max-width: 300px;
  }
`;

export const Bottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;
