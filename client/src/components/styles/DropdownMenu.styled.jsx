import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  & > input {
    display: none;
  }

  & > svg {
    cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
    border: ${({ isActive }) => (isActive ? "1px solid white" : "none")};
  }

  &:hover {
    cursor: ${({ user }) => (user.length === 0 ? "default" : "pointer")};
  }

  & > svg:hover {
    cursor: ${({ user }) => (user.length === 0 ? "default" : "pointer")};
  }
`;

export const Menu = styled.nav`
  position: absolute;
  top: 32px;
  left: -80px;
  width: 220px;
  background: white;
  border-radius: 10px;
  border: 1px solid #c2e7ba;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: ${({ isActive }) => (isActive ? "1" : "0")};
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
  transform: ${({ isActive }) => (isActive ? "translateY(0)" : "translateY(-20px)")};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

  & > ul {
    list-style: none;
  }

  & > ul li {
    margin: 6px 8px;
    padding-left: 6px;
    padding-top: 4px;
    padding-bottom: 4px;
    color: black;
    border-bottom: 1px solid #74b0e7;
  }

  & > ul li:hover {
    color: white;
    border-radius: 4px;
    background-color: #1877f2;
  }

  & > ul li:last-child {
    border-bottom: none;
  }
`;
