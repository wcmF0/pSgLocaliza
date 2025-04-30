import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ComoJogar from "./pages/ComoJogar";
import NotFound from "./pages/NotFound";
import PaginaPadrao from "./components/PaginaPadrao/PaginaPadrao";
import Padrao from "./pages/Padrao";
import Livre from "./pages/Livre";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPadrao />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/comojogar" element={<ComoJogar />} />
        <Route path="/jogar/padrao" element={<Padrao />} />
        <Route path="/jogar/livre" element={<Livre />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
