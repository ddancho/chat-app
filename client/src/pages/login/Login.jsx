import { Container, Shadow, Form, Desc, ErrMsg, LogInfo, LogTitle, LogMsg } from "../styles/Login.styled";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/getUserInfo";
import axios from "axios";

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();

  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const resetStates = () => {
    setEmailErrors([]);
    setPasswordErrors([]);
    setServerErrors("");
    setLoginStatus(false);
  };

  const resetRefs = () => {
    email.current.value = null;
    password.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    resetStates();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    axios
      .post("/api/v1/auth/login", user)
      .then((res) => {
        setLoginStatus(true);
        setTimeout(() => {
          resetStates();
          resetRefs();
          dispatch(getUserInfo());
          history.push("/");
        }, 5 * 1000);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          err.response.data.emailErrors && setEmailErrors(err.response.data.emailErrors);
          err.response.data.passwordErrors && setPasswordErrors(err.response.data.passwordErrors);
        } else {
          setServerErrors("Please try again later...");
        }
      });
  };

  return (
    <>
      <Container>
        <Desc>
          <h1>Already Registered?</h1>
          <span>Login to start talking to friends around world</span>
        </Desc>
        <Shadow>
          <Form onSubmit={handleSubmit} autoComplete='off'>
            <div>
              <input type='email' placeholder='Email' ref={email} />
              <ErrMsg showMsg={emailErrors.length > 0 ? "visible" : "hidden"}>
                <p id='logEmailErrors'>{emailErrors[0] || 0}</p>
              </ErrMsg>
            </div>
            <div>
              <input type='password' placeholder='Password' ref={password} />
              <ErrMsg showMsg={passwordErrors.length > 0 ? "visible" : "hidden"}>
                <p id='logPasswordErrors'>{passwordErrors[0] || 0}</p>
              </ErrMsg>
            </div>
            <div>
              <button type='submit'>Sign Up</button>
            </div>
            <div>
              <ErrMsg showMsg={serverErrors ? "visible" : "hidden"}>
                <p id='logServerErrors'>{serverErrors || 0}</p>
              </ErrMsg>
            </div>
          </Form>
        </Shadow>
      </Container>
      <LogInfo>
        <LogTitle showMsg={loginStatus ? "visible" : "hidden"}>
          Thank you, your login was successfull...
        </LogTitle>
        <LogMsg showMsg={loginStatus ? "visible" : "hidden"}>Redirecting to Home page...</LogMsg>
      </LogInfo>
    </>
  );
}
