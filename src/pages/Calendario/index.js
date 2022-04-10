import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import moment from "moment-timezone";

function Calendario() {
  const [data, setData] = useState();
  const [listaDeTarefas, setListaDeTarefas] = useState([]);
  const [searchDate, setSearchDate] = useState();
  const [novaLista, setNovaLista] = useState([]);

  useEffect(() => {
    async function getTarefas() {
      axios({
        method: "get",
        url: "https://revisao-app.herokuapp.com/",
      }).then((res) => setListaDeTarefas(res.data));
    }
    getTarefas();
  }, []);
  useEffect(() => {
    setSearchDate(moment(data).tz("America/Sao_Paulo").format("DD/MM/YYYY"));
  }, [data]);

  useEffect(() => {
    if (searchDate) {
      findTarefas();
    }
  }, [searchDate]);

  function findTarefas() {
    const filtrada1 = listaDeTarefas.filter(
      (tarefa) =>
        searchDate ==
        moment(tarefa.dataRevisao1).tz("America/Sao_Paulo").format("DD/MM/YYYY")
    );
    const filtrada2 = listaDeTarefas.filter(
      (tarefa) =>
        searchDate ==
        moment(tarefa.dataRevisao7).tz("America/Sao_Paulo").format("DD/MM/YYYY")
    );
    const filtrada3 = listaDeTarefas.filter(
      (tarefa) =>
        searchDate ==
        moment(tarefa.dataRevisao30)
          .tz("America/Sao_Paulo")
          .format("DD/MM/YYYY")
    );

    const listaFiltrada = [...filtrada1, ...filtrada2, ...filtrada3];
    setNovaLista(listaFiltrada);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Calendario</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder=""
              />
            </Form.Group>
          </Form>
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
              {novaLista.map((tarefa, index) => (
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

export default Calendario;
