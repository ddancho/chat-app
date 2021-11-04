import { Container, Menu } from "../styles/DropdownMenu.styled";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DropdownMenu({ handleFileUpload, handleLogout, children }) {
  const [isActive, setIsActive] = useState(false);
  const dropdown = useRef();
  const hiddenInput = useRef();

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

  const handleUploadClick = (e) => {
    document.getElementById("fileInput").value = "";
    hiddenInput.current.click();
  };

  const handleChange = (e) => {
    const fileToUpload = e.target.files;
    handleFileUpload(fileToUpload);
  };

  return (
    <Container onClick={handleClick} isActive={isActive} user={user}>
      {children}
      <Menu ref={dropdown} isActive={isActive}>
        <ul>
          <li onClick={handleUploadClick}>Upload Profile Picture</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </Menu>
      <input type='file' id='fileInput' ref={hiddenInput} onChange={handleChange} />
    </Container>
  );
}
