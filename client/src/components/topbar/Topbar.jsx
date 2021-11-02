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
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/getUserInfo";
import axios from "axios";

export default function Topbar() {
  const images = process.env.REACT_APP_PUBLIC_IMAGES;
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [isLogout, dispatch]);

  const { userInfo: user } = useSelector((state) => state.user);

  const handleLogout = () => {
    setTimeout(() => {
      axios
        .get("/api/v1/auth/logout")
        .then((res) => {
          setIsLogout(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
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
          <DropdownMenu handleLogout={handleLogout}>
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
    </Container>
  );
}
