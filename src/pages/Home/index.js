import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Home() {
  const [senha, setSenha] = useState("");

  async function logar() {
    axios({
      method: "post",
      url: "https://revisao-app.herokuapp.com/login",
      data: {
        senha,
      },
    })
      .then((res) => {
        localStorage.setItem("AcessoDeBenzinha", "permitido");
        console.log(res);
      })
      .catch((e) => console.log(e))
      .finally(document.location.reload(true));
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Bem vinda benzinha</h1>
          <Form style={{ width: 400, maxWidth: "100%" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha para ter acesso ao app"
              />
            </Form.Group>
          </Form>
          <Button onClick={() => logar()}>Entrar</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
