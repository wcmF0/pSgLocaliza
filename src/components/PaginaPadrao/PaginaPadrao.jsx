import { Outlet } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";
import "./PaginaPadrao.css";

const PaginaPadrao = () => {
  return (
    <div className="pagina-padrao">
      <TopBar />
      <main className="pagina-conteudo">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PaginaPadrao;
