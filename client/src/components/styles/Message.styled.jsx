import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ own }) => (own ? "flex-start" : "flex-end")};
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
    background-color: ${({ own }) => (own ? "#1877f2" : "#ccd3dd")};
    color: ${({ own }) => (own ? "white" : "black")};
    max-width: 300px;
  }
`;

export const Bottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;
