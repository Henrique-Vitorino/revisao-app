import axios from "axios";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

function Tarefas() {
  const [listaDeTarefas, setListaDeTarefas] = useState([]);
  const [nome, setNome] = useState("");
  const [aula, setAula] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    async function getTarefas() {
      axios({
        method: "get",
        url: "https://revisao-app.herokuapp.com/",
      }).then((res) => setListaDeTarefas(res.data));
    }
    getTarefas();
  }, []);

  async function getTarefas() {
    axios({
      method: "get",
      url: "https://revisao-app.herokuapp.com/",
    }).then((res) => setListaDeTarefas(res.data));
  }

  async function createTarefa() {
    let dataRetroativa;
    if (data) {
      dataRetroativa = moment(data).format();
    }
    axios({
      method: "post",
      url: "https://revisao-app.herokuapp.com/tarefas",
      data: {
        nome,
        aula,
        conteudo,
        data: data ? dataRetroativa : "",
      },
    })
      .then(() => {
        setNome("");
        setAula("");
        setConteudo("");
        setData("");
        getTarefas();
        toast.success("Tarefa criada com sucesso!");
      })
      .catch((e) => toast.error("Ops!"));
  }

  async function apagarTarefa(id) {
    axios({
      method: "delete",
      url: "https://revisao-app.herokuapp.com/tarefas",
      data: {
        id,
      },
    }).then(() => {
      getTarefas();
    });
  }
  useEffect(() => console.log(data), [data]);
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Row>
        <Col>
          <h1>Tarefas</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome da tarefa"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Aula</Form.Label>
              <Form.Control
                type="text"
                value={aula}
                onChange={(e) => setAula(e.target.value)}
                placeholder="Digite a aula da tarefa"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Conteudo</Form.Label>
              <Form.Control
                type="text"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Digite o conteudo da tarefa"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder=""
              />
            </Form.Group>

            <Button
              style={{
                background: "#FFAF79",
                border: "#FFAF79",
                fontWeight: "bold",
                fontSize: "18px",
                marginRight: "20px",
              }}
              variant="primary"
              className="mb-5"
              onClick={() => setData("")}
            >
              Limpar data
            </Button>
            <Button
              style={{
                background: "#B8B8FF",
                border: "#B8B8FF",
                fontWeight: "bold",
                fontSize: "18px",
              }}
              variant="primary"
              className="mb-5"
              onClick={() => createTarefa()}
            >
              Criar tarefa
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Tarefas cadastradas</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Aula</th>
                <th>Conteudo</th>
                <th>Feito em</th>
                <th>Revisao 1</th>
                <th>Revisao 2</th>
                <th>Revisao 3</th>
                {/* <th>Apagar</th> */}
              </tr>
            </thead>
            <tbody>
              {listaDeTarefas.map((tarefa, index) => (
                <tr key={index}>
                  <td>{tarefa.nome}</td>
                  <td>{tarefa.aula}</td>
                  <td>{tarefa.conteudo}</td>
                  <td>
                    {moment(tarefa.dataCriacao)
                      .tz("America/Sao_Paulo")
                      .format("DD/MM/YYYY,HH:mm:ss")}
                  </td>
                  <td>
                    {moment(tarefa.dataRevisao1)
                      .tz("America/Sao_Paulo")
                      .format("DD/MM/YYYY,HH:mm:ss")}
                  </td>
                  <td>
                    {moment(tarefa.dataRevisao7)
                      .tz("America/Sao_Paulo")
                      .format("DD/MM/YYYY,HH:mm:ss")}
                  </td>
                  <td>
                    {moment(tarefa.dataRevisao30)
                      .tz("America/Sao_Paulo")
                      .format("DD/MM/YYYY,HH:mm:ss")}
                  </td>
                  {/* <td>
                    <Button onClick={() => apagarTarefa(tarefa._id)}>
                      Apagar Tarefa
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Tarefas;
