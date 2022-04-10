import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tarefas from "./pages/Tarefas";
import Calendario from "./pages/Calendario";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.min.css";
function App() {
  function PrivateRoute(componente) {
    if (localStorage.getItem("AcessoDeBenzinha")) {
      console.log("acesso permitido");
      return componente;
    } else {
      console.log("acesso negado");
      return <Home />;
    }
  }
  return (
    <BrowserRouter>
      <Menu>
        {/* <ToastContainer> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="tarefas" element={PrivateRoute(<Tarefas />)} />
          <Route path="calendario" element={PrivateRoute(<Calendario />)} /> */}
          <Route path="tarefas" element={<Tarefas />} />
          <Route path="calendario" element={<Calendario />} />
        </Routes>
        {/* </ToastContainer> */}
      </Menu>
    </BrowserRouter>
  );
}

export default App;
