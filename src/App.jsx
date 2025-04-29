import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ComoJogar from "./pages/ComoJogar";
import NotFound from "./pages/NotFound";
import PaginaPadrao from "./components/PaginaPadrao/PaginaPadrao";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPadrao />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/comojogar" element={<ComoJogar />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
