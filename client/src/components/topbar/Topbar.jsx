import {
  Container,
  Flex,
  Logo,
  SearchBar,
  SearchBarIcon,
  SearchBarInput,
  FlexRight,
  LinksContainer,
  IconsContainer,
  Profile,
  ProfileImg,
} from "../styles/TopBar.styled";
import DropdownMenu from "../dropdownmenu/DropdownMenu";
import Modal from "../modal/Modal";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/getUserInfo";
import axios from "axios";

export default function Topbar() {
  const images = process.env.REACT_APP_PUBLIC_IMAGES;
  const [isLogout, setIsLogout] = useState(false);
  const [modal, setModal] = useState({ show: false });
  const [profilePic, setProfilePic] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
    setIsLogout(false);
    setProfilePic(false);
  }, [isLogout, modal, profilePic, dispatch]);

  const { userInfo: user } = useSelector((state) => state.user);

  const handleLogout = () => {
    setTimeout(() => {
      axios
        .get("/api/v1/auth/logout")
        .then((res) => {
          setIsLogout(true);
        })
        .catch((err) => console.log(err));
    }, 700);
  };

  const handleFileUpload = (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload[0]);
    axios
      .post("/api/v1/upload", formData, { headers: { "content-type": "multipart/form-data" } })
      .then((res) =>
        setModal({
          show: true,
          status: "success",
          text: "New profile picture is uploaded.",
        })
      )
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 413) {
          // check status 413 req entity too large
          return setModal({
            show: true,
            status: "error",
            text: "Image file is too big, max size is 1MB.",
          });
        } else if (err.response.status === 400) {
          // check status 400 image format not suported
          return setModal({
            show: true,
            status: "error",
            text: "Image format is not suported, please use .jpeg, .jpg or .png files.",
          });
        }
        setModal({ show: true, status: "error", text: "There is some issue with server, please try later." });
      });
  };

  const handleCloseModal = () => {
    setModal({ show: false });
    setProfilePic(true);
  };

  return (
    <Container>
      <Flex value={3}>
        <Link to='/'>
          <Logo>Chat App</Logo>
        </Link>
      </Flex>
      <Flex value={5}>
        <SearchBar>
          <SearchBarIcon>
            <Search />
          </SearchBarIcon>
          <SearchBarInput placeholder='Search for friend' />
        </SearchBar>
      </Flex>
      <FlexRight>
        {user.length === 0 && (
          <LinksContainer>
            <div>
              <Link to='/login'>Login</Link>
            </div>
            <div>
              <Link to='/register'>Sign Up</Link>
            </div>
          </LinksContainer>
        )}
        <IconsContainer>
          <DropdownMenu handleFileUpload={handleFileUpload} handleLogout={handleLogout}>
            <Person />
          </DropdownMenu>
          <div>
            <Chat />
            <span>2</span>
          </div>
          <div>
            <Notifications />
            <span>1</span>
          </div>
        </IconsContainer>
      </FlexRight>
      <Profile>
        {user && <p>{user.username}</p>}
        <ProfileImg
          src={images + ((user && user.profilePicture) || "person/noAvatar.png")}
          alt='profilePicture'
        />
      </Profile>
      <Modal modal={modal} handleCloseModal={handleCloseModal} />
    </Container>
  );
}
