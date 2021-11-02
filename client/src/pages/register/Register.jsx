import { Container, Shadow, Form, ErrMsg, Desc, RegInfo, RegTitle, RegMsg } from "../styles/Register.styled";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const history = useHistory();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirm = useRef();

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmErrors, setConfirmErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(false);

  const resetStates = () => {
    setUsernameErrors([]);
    setEmailErrors([]);
    setPasswordErrors([]);
    setConfirmErrors([]);
    setServerErrors("");
    setRegistrationStatus(false);
  };

  const resetRefs = () => {
    username.current.value = null;
    email.current.value = null;
    password.current.value = null;
    confirm.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetStates();

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      confirm: confirm.current.value,
    };

    axios
      .post("/api/v1/auth/register", user)
      .then((res) => {
        setRegistrationStatus(true);
        setTimeout(() => {
          resetStates();
          resetRefs();
          history.push("/login");
        }, 5 * 1000);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          err.response.data.usernameErrors && setUsernameErrors(err.response.data.usernameErrors);
          err.response.data.emailErrors && setEmailErrors(err.response.data.emailErrors);
          err.response.data.passwordErrors && setPasswordErrors(err.response.data.passwordErrors);
          err.response.data.confirmErrors && setConfirmErrors(err.response.data.confirmErrors);
        } else {
          setServerErrors("Please try again later...");
        }
      });
  };

  return (
    <>
      <Container>
        <Desc>
          <h1>New Here?</h1>
          <span>Register to create an account</span>
        </Desc>
        <Shadow>
          <Form onSubmit={handleSubmit} autoComplete='off'>
            <div>
              <input type='text' placeholder='Username' ref={username} />
              <ErrMsg showMsg={usernameErrors.length > 0 ? "visible" : "hidden"}>
                <p id='regUsernameErrors'>{usernameErrors[0] || 0}</p>
              </ErrMsg>
            </div>
            <div>
              <input type='email' placeholder='Email' ref={email} />
              <ErrMsg showMsg={emailErrors.length > 0 ? "visible" : "hidden"}>
                <p id='regEmailErrors'>{emailErrors[0] || 0}</p>
              </ErrMsg>
            </div>
            <div>
              <input type='password' placeholder='Password' ref={password} />
              <ErrMsg showMsg={passwordErrors.length > 0 ? "visible" : "hidden"}>
                <p id='regPasswordErrors'>{passwordErrors[0] || 0}</p>
              </ErrMsg>
            </div>
            <div>
              <input type='password' placeholder='Confirm Password' ref={confirm} />
              <ErrMsg showMsg={confirmErrors.length > 0 ? "visible" : "hidden"}>
                <p id='regConfirmErrors'>{confirmErrors[0] || 0}</p>
              </ErrMsg>
            </div>
            <div>
              <button type='submit'>Sign Up</button>
            </div>
            <div>
              <ErrMsg showMsg={serverErrors ? "visible" : "hidden"}>
                <p id='regServerErrors'>{serverErrors || 0}</p>
              </ErrMsg>
            </div>
          </Form>
        </Shadow>
      </Container>
      <RegInfo>
        <RegTitle showMsg={registrationStatus ? "visible" : "hidden"}>
          Thank you, your registration was successfull...
        </RegTitle>
        <RegMsg showMsg={registrationStatus ? "visible" : "hidden"}>Redirecting to Login page...</RegMsg>
      </RegInfo>
    </>
  );
}
