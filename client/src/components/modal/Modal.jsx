import { Container, Content } from "../styles/Modal.styled";
import { Close } from "@material-ui/icons";

export default function Modal({ modal, handleCloseModal }) {
  const { show, status, text } = modal;
  return (
    <>
      {show ? (
        <Container>
          <Content status={status}>
            <header>
              <h2>{status}</h2>
              <span onClick={handleCloseModal}>
                <Close />
              </span>
            </header>
            <main>{text}</main>
          </Content>
        </Container>
      ) : null}
    </>
  );
}
