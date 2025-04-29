import { Link } from "react-router-dom";
import "./HomeContent.css";

const HomeContent = () => {
  return (
    <div className="home-container">
      <div>
        <h3>Advinhe bairros de São Gonçalo</h3>
        <ul>
          <li className="padrao">
            <Link to="/jogar/padrao">
              <h2>Padrão</h2>
              <p>Sera que você consegue acertar o bairro do dia?</p>
            </Link>
          </li>
          <li className="livre">
            <Link to="/jogar/livre">
              <h2>Livre</h2>
              <p>Tente acertar a maior quantidade de bairros possivel!</p>
            </Link>
          </li>
          <li>
            <h3>Mais modos no futuro...</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeContent;
