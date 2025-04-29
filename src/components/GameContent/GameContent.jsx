import { useEffect, useState } from "react";
import "./GameContent.css";

export default function GameContent({ modo }) {
  const [bairroDoDia, setBairroDoDia] = useState(null);
  const [tentativa, setTentativa] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const endpoint =
    modo === "padrao"
      ? "http://localhost:3001/api/padrao"
      : "http://localhost:3001/api/livre";

  const verificarEndpoint =
    modo === "padrao"
      ? "http://localhost:3001/api/verificar/padrao"
      : "http://localhost:3001/api/verificar/livre";

  useEffect(() => {
    console.log("Buscando bairro do modo:", modo);
    setBairroDoDia(null);
    fetch(endpoint)
      .then((res) => {
        console.log("Resposta da API:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Bairro recebido:", data);
        setBairroDoDia(data);
      })
      .catch((err) => {
        console.error("Erro no fetch:", err);
        setMensagem("Erro ao buscar o bairro. Tente novamente mais tarde.");
      });
  }, [modo]);

  const handleChange = (e) => {
    const valor = e.target.value;
    setTentativa(valor);

    if (valor.length > 0 && bairroDoDia) {
      const filtrado = [bairroDoDia.nome].filter((bairro) =>
        bairro.toLowerCase().startsWith(valor.toLowerCase())
      );
      setSugestoes(filtrado);
    } else {
      setSugestoes([]);
    }
  };

  const preencherInput = (bairro) => {
    setTentativa(bairro);
    setSugestoes([]);
  };

  const verificarResposta = async (e) => {
    e.preventDefault();

    const resposta = tentativa.trim().toLowerCase();

    try {
      const res = await fetch(verificarEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resposta }),
      });

      const data = await res.json();

      if (data.correta) {
        setAcertou(true);
        setMensagem("🎉 Parabéns! Você acertou o bairro!");
        if (modo === "livre") {
          // carregar novo bairro
          const novoBairro = await fetch(endpoint).then((r) => r.json());
          setBairroDoDia(novoBairro);
          setImagemIndex(0);
          setAcertou(false);
        }
      } else {
        if (imagemIndex < bairroDoDia.imagens.length - 1) {
          setImagemIndex(imagemIndex + 1);
          setMensagem("❌ Errou! Veja mais uma imagem...");
        } else {
          setMensagem("🚫 Você errou! Não há mais imagens.");
        }
      }

      setTentativa("");
      setSugestoes([]);
    } catch (error) {
      setMensagem("Erro ao verificar resposta. Tente novamente.");
    }
  };

  if (!bairroDoDia) {
    return <p>Carregando bairro...</p>;
  }

  return (
    <div className="game-container">
      <h2 className="game-title">
        {modo === "padrao"
          ? "Descubra o bairro do dia!"
          : "Descubra o bairro! (Modo Livre)"}
      </h2>

      <img
        src={bairroDoDia.imagens[imagemIndex]}
        alt={`Vista do bairro ${imagemIndex + 1}`}
        className="game-img"
      />

      {!acertou && (
        <form onSubmit={verificarResposta} className="game-form">
          <input
            type="text"
            placeholder="Nome do bairro"
            value={tentativa}
            onChange={handleChange}
            required
            className="game-input"
          />

          {sugestoes.length > 0 && (
            <ul className="suggestions-list">
              {sugestoes.map((bairro) => (
                <li key={bairro} onClick={() => preencherInput(bairro)}>
                  {bairro}
                </li>
              ))}
            </ul>
          )}

          <button type="submit" className="game-button">
            Enviar
          </button>
        </form>
      )}

      {mensagem && <p className="game-mensagem">{mensagem}</p>}
    </div>
  );
}
