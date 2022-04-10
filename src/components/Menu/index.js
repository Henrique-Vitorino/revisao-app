import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu({ children }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>Revisão app</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/tarefas">Tarefas</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/calendario">Calendario</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
}

export default Menu;
