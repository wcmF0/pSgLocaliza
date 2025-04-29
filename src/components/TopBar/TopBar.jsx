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
              <Link className="Link" to="/">
                Início
              </Link>
            </li>
            <li>
              <Link className="Link" to="/comojogar">
                Como Jogar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default TopBar;
