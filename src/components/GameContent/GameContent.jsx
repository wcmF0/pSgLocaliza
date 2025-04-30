import { useEffect, useState } from "react";
import "./GameContent.css";
import todosBairros from "../../data/todosBairros.json";

export default function GameContent({ modo }) {
  const [bairroDoDia, setBairroDoDia] = useState(null);
  const [tentativa, setTentativa] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tentativasRestantes, setTentativasRestantes] = useState(5);
  const [perdeu, setPerdeu] = useState(false);
  const [contador, setContador] = useState(""); // Estado para o cronômetro

  const baseURL = "https://p-sg-localiza-backend.vercel.app/api";

  const endpoint = modo === "padrao" ? `${baseURL}/padrao` : `${baseURL}/livre`;

  const verificarEndpoint =
    modo === "padrao"
      ? `${baseURL}/padrao-verificar`
      : `${baseURL}/livre-verificar`;

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

  // Função para calcular a contagem regressiva até meia-noite
  const calcularContagemRegressiva = () => {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0); // Definir próxima meia-noite

    const diff = nextMidnight - now; // Diferença em milissegundos

    const horas = Math.floor(diff / 1000 / 60 / 60);
    const minutos = Math.floor((diff / 1000 / 60) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    setContador(
      `${horas < 10 ? "0" : ""}${horas}:${minutos < 10 ? "0" : ""}${minutos}:${
        segundos < 10 ? "0" : ""
      }${segundos}`
    );
  };

  useEffect(() => {
    carregarBairro();
    const timer = setInterval(calcularContagemRegressiva, 1000); // Atualiza a contagem regressiva a cada segundo

    return () => clearInterval(timer); // Limpa o intervalo quando o componente for desmontado
  }, [modo]);

  const handleChange = (e) => {
    const valor = e.target.value;
    setTentativa(valor);

    if (valor.length > 0) {
      const filtrado = todosBairros.filter((bairro) =>
        bairro.toLowerCase().startsWith(valor.toLowerCase())
      );
      setSugestoes(filtrado);
    } else {
      setSugestoes([]); // Limpa sugestões se o input estiver vazio
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

        if (modo === "livre") {
          setTimeout(async () => {
            await carregarBairro(); // carrega novo bairro e reseta tudo
          }, 1000);
        }
      } else {
        if (modo === "livre") {
          if (data.tentativasRestantes !== undefined) {
            const novasTentativas = Math.max(0, data.tentativasRestantes || 0);
            setTentativasRestantes(novasTentativas);

            if (novasTentativas === 0) {
              setPerdeu(true);
              setMensagem("🚫 Você esgotou suas tentativas.");
            } else {
              if (imagemIndex < bairroDoDia.imagens.length - 1) {
                setImagemIndex(imagemIndex + 1);
                setMensagem("❌ Errou! Veja mais uma imagem...");
              } else {
                setMensagem("❌ Errou!");
              }
            }
          }
        } else {
          // modo padrão (sem limite de tentativas)
          if (imagemIndex < bairroDoDia.imagens.length - 1) {
            setImagemIndex(imagemIndex + 1);
            setMensagem("❌ Errou! Veja mais uma imagem...");
          } else {
            setMensagem("❌ Errou!");
          }
        }
      }

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

          {modo === "livre" && (
            <div className="tentativas-container">
              <span className="tentativas-label">Vidas:</span>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`coracao ${
                    i < tentativasRestantes ? "viva" : "perdida"
                  }`}
                >
                  {i < tentativasRestantes ? "❤️" : "💔"}
                </span>
              ))}
            </div>
          )}
        </>
      )}

      {mensagem && <p className="game-mensagem">{mensagem}</p>}

      {acertou && modo === "padrao" && (
        <div className="countdown">
          <p>O próximo bairro atualiza em: </p>
          <span>{contador}</span>
        </div>
      )}
      {acertou && modo === "padrao" && (
        <a href="/jogar/livre" className="try-livre-button">
          👉 Experimentar o modo livre
        </a>
      )}

      {perdeu && (
        <button onClick={tentarNovamente} className="retry-button">
          Tentar novamente
        </button>
      )}
    </div>
  );
}
