import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #1877f2;
`;

export const Flex = styled.div`
  flex: ${({ value }) => value || "1"};

  & > a {
    text-decoration: none;
  }
`;

export const Logo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

export const FlexRight = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  margin-right: 20px;
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-right: 16px;
  }

  & > div a {
    text-decoration: none;
    font-size: 16px;
    color: white;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin: 0 auto;
  }
`;

export const Profile = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;

  & > p {
    color: white;
    margin-right: 10px;
  }
`;

export const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
