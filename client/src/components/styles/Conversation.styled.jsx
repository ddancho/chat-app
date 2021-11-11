import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  border-left: ${({ isSelected }) => (isSelected ? "4px solid #1877f2" : "4px solid #f0f2f5")};

  &:hover {
    background-color: #c2e7ba;
  }

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  & > span {
    font-weight: 500;
  }
`;
