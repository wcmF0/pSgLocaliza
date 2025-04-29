import { Link } from "react-router-dom";
import "./HomeContent.css";

const HomeContent = () => {
  return (
    <div>
      <Link to="/jogar/padrao">Clique aqui para Jogar</Link>
    </div>
  );
};

export default HomeContent;
