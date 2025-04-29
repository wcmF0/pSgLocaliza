import { Github } from "lucide-react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Desenvolvido por
        <a href="">
          wcmF0 <Github />{" "}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
