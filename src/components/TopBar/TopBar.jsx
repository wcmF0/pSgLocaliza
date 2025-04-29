import { Link } from "react-router-dom";
import "./TopBar.css";
import LogoSgLocaliza from "/public/SgLocaliza.png";

const TopBar = () => {
  return (
    <main className="topbar">
      <div>
        <img src={LogoSgLocaliza} alt="Logo do SG Localiza" />
        <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/comojogar">Como Jogar</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default TopBar;
