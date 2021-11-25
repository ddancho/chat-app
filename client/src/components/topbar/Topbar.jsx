import {
  Container,
  Flex,
  Logo,
  FlexRight,
  LinksContainer,
  IconsContainer,
  Profile,
  ProfileImg,
} from "../styles/TopBar.styled";
import DropdownMenu from "../dropdownmenu/DropdownMenu";
import Modal from "../modal/Modal";
import { Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/getUserInfo";
import { updateUsersOnline, updateMsg, updateUserNewUpload } from "../../redux/userSlice";
import { io } from "socket.io-client";
import useOnSocketEvent from "../../customHooks/useOnSocketEvent";
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

  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost/", {
      path: "/socket.io",
      transports: ["websocket"],
      upgrade: false,
    });
    socket.current.emit("getContactsOnline");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.id);
  }, [user]);

  const { response: contactsOnline } = useOnSocketEvent({
    socket: socket.current,
    event: "contactsOnline",
  });
  useEffect(() => {
    dispatch(updateUsersOnline(contactsOnline));
  }, [contactsOnline, dispatch]);

  const { response: contactsUpdated } = useOnSocketEvent({
    socket: socket.current,
    event: "contactsUpdated",
  });
  useEffect(() => {
    dispatch(updateUsersOnline(contactsUpdated));
  }, [contactsUpdated, dispatch]);

  const { response: onGetMessageData } = useOnSocketEvent({
    socket: socket?.current,
    event: "getMessage",
  });
  useEffect(() => {
    dispatch(updateMsg(onGetMessageData));
  }, [onGetMessageData, dispatch]);

  const handleLogout = () => {
    setTimeout(() => {
      axios
        .get("/api/v1/auth/logout")
        .then((res) => {
          socket.current.emit("removeUser", user.id);
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
      .then((res) => {
        dispatch(updateUserNewUpload(res.data));
        setModal({
          show: true,
          status: "success",
          text: "New profile picture is uploaded.",
        });
      })
      .catch((err) => {
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
      <FlexRight>
        {!user.id && (
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
        </IconsContainer>
      </FlexRight>
      <Profile>
        {user.id && <p>{user.username}</p>}
        <ProfileImg
          src={images + ((user.id && user.profilePicture) || "person/noAvatar.png")}
          alt='profilePicture'
        />
      </Profile>
      <Modal modal={modal} handleCloseModal={handleCloseModal} />
    </Container>
  );
}
