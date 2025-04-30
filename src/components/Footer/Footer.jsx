import { Github } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Desenvolvido por
        <a
          a
          href="https://github.com/wcmF0"
          target="_blank"
          rel="noopener noreferrer"
        >
          wcmF0 <Github />{" "}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
