import { useEffect, useState } from "react";
import "./GameContent.css";

export default function GameContent({ modo }) {
  const [bairroDoDia, setBairroDoDia] = useState(null);
  const [tentativa, setTentativa] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tentativasRestantes, setTentativasRestantes] = useState(5);
  const [perdeu, setPerdeu] = useState(false);

  const endpoint =
    modo === "padrao"
      ? "http://localhost:3001/api/padrao"
      : "http://localhost:3001/api/livre";

  const verificarEndpoint =
    modo === "padrao"
      ? "http://localhost:3001/api/padrao/verificar"
      : "http://localhost:3001/api/livre/verificar";

  const carregarBairro = async () => {
    try {
      const data = await fetch(endpoint).then((res) => res.json());
      setBairroDoDia(data);
      setImagemIndex(0);
      setTentativa("");
      setSugestoes([]);
      setMensagem("");
      setAcertou(false);
      setPerdeu(false);
      setTentativasRestantes(5);
    } catch (err) {
      console.error("Erro ao buscar o bairro:", err);
      setMensagem("Erro ao buscar o bairro. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    carregarBairro();
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

      if (data.correto) {
        setAcertou(true);
        setMensagem(data.mensagem || "🎉 Parabéns! Você acertou o bairro!");

        // Quando acertar, carregue um novo bairro no modo livre
        if (modo === "livre") {
          setTimeout(() => {
            carregarBairro(); // carrega novo bairro e reseta tudo
          }, 1000);
        }
      } else {
        if (data.erro === "Você esgotou suas tentativas. Tente novamente!") {
          setMensagem("🚫 Você esgotou suas tentativas.");
          setPerdeu(true);
          setTentativasRestantes(0);
        } else {
          // Atualiza tentativas restantes
          const novasTentativas = Math.max(0, data.tentativasRestantes || 0);
          setTentativasRestantes(novasTentativas);

          if (novasTentativas === 0) {
            setMensagem("🚫 Você esgotou suas tentativas.");
            setPerdeu(true);
          } else {
            // Verifica se ainda há mais imagens, se sim, incrementa a imagem
            if (imagemIndex < bairroDoDia.imagens.length - 1) {
              setImagemIndex(imagemIndex + 1);
              setMensagem("❌ Errou! Veja mais uma imagem...");
            } else {
              setMensagem("🚫 Você esgotou as imagens deste bairro.");
            }
          }
        }
      }

      // Limpa a tentativa e sugestões
      setTentativa("");
      setSugestoes([]);
    } catch (error) {
      setMensagem("Erro ao verificar resposta. Tente novamente.");
    }
  };

  const tentarNovamente = () => {
    carregarBairro();
  };

  if (
    !bairroDoDia ||
    !bairroDoDia.imagens ||
    bairroDoDia.imagens.length === 0
  ) {
    return <p>Bairro sem imagens disponíveis. Tente novamente mais tarde.</p>;
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

      {!acertou && !perdeu && (
        <>
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

          {tentativasRestantes > 0 && (
            <p className="tentativas-container">
              Tentativas restantes: {tentativasRestantes}
            </p>
          )}
        </>
      )}

      {mensagem && <p className="game-mensagem">{mensagem}</p>}

      {perdeu && (
        <button onClick={tentarNovamente} className="retry-button">
          Tentar novamente
        </button>
      )}
    </div>
  );
}
