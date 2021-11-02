import { Container, Menu } from "../styles/DropdownMenu.styled";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DropdownMenu({ handleLogout, children }) {
  const [isActive, setIsActive] = useState(false);
  const dropdown = useRef();
  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    const closeMenu = (e) => {
      if (dropdown.current !== null && !dropdown.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (user.length === 0) {
      setIsActive(false);
    }

    if (isActive) {
      window.addEventListener("click", closeMenu);
    }

    return () => window.removeEventListener("click", closeMenu);
  }, [isActive, user]);

  const handleClick = () => {
    if (user.length === 0) {
      return false;
    }
    setIsActive(!isActive);
  };

  return (
    <Container onClick={handleClick} isActive={isActive} user={user}>
      {children}
      <Menu ref={dropdown} isActive={isActive}>
        <ul>
          <li>Upload Profile Picture</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </Menu>
    </Container>
  );
}
