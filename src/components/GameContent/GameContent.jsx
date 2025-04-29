import { useState } from "react";
import "./GameContent.css";

const bairros = [
  "Antonina",
  "Almerinda",
  "Apolo III",
  "Barro Vermelho I",
  "Boaçu",
  "Amendoeira",
  "Barracão",
  "Boa Vista",
  "Brasilândia I",
  "Anaia Grande",
  "Bom Retiro",
  "Camarão",
  "Centro",
  "Anaia Pequeno",
  "Gebara",
  "Covanca I",
  "Colubandê",
  "Arrastão",
  "Guarani",
  "Gradim",
  "Cruzeiro do Sul",
  "Arsenal",
  "Guaxindiba",
  "Mangueira",
  "Engenho Pequeno I",
  "Coelho",
  "Jardim Catarina",
  "Neves I",
  "Estrela do Norte",
  "Eliane",
  "Laranjal",
  "Parada 40",
  "Fazenda dos Mineiros",
  "Engenho do Roçado",
  "Marambaia",
  "Paraíso",
  "Galo Branco",
  "Iêda",
  "Miriambi",
  "Patronato",
  "Itaóca",
  "Ipiíba",
  "Monjolo",
  "Bairro Pita I",
  "Itaúna",
  "Jardim Amendoeira",
  "Porto da Madama",
  "Jardim Alcântara",
  "Jardim Nova República",
  "Porto Novo",
  "Lindo Parque I",
  "Jockey",
  "Porto da Pedra",
  "Luiz Caçador",
  "Lagoinha I",
  "Porto Velho",
  "Mutondo",
  "Largo da Ideia I",
  "Rosane",
  "Mutuá",
  "Maria Paula I",
  "Santa Catarina I",
  "Mutuaguaçú",
  "Pacheco I",
  "Santa Luzia",
  "Mutuapira",
  "Raul Veiga I",
  "Vila Três",
  "Nova Cidade",
  "Rio do Ouro",
  "Vista Alegre",
  "Palmeiras",
  "Sacramento I",
  "Vila Lage",
  "Pedro de Alcântara",
  "Santa Izabel",
  "Venda da Cruz",
  "Porto do Rosa",
  "Tiradentes",
  "Zé Garoto I",
  "Recanto das Acácias",
  "Tribobó I",
  "Rocha",
  "Várzea das Moças",
  "Salgueiro",
  "Vila Condoza",
  "São Miguel",
  "Trindade",
  "Vila Yara",
  "Zumbi",
];

const bairroDoDia = {
  nome: "Rocha",
  imagens: [
    "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?cb_client=maps_sv.tactile&w=900&h=600&pitch=0.65&panoid=QrUrjfDdTIOC0gHxyyDrgQ&yaw=66.68",
    "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?cb_client=maps_sv.tactile&w=900&h=600&pitch=14.04&panoid=qNxTo_XLtc6jCuQjDljDqQ&yaw=151.91",
  ],
};

export default function GameContent() {
  const [tentativa, setTentativa] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [acertou, setAcertou] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const valor = e.target.value;
    setTentativa(valor);

    if (valor.length > 0) {
      const filtrado = bairros.filter((bairro) =>
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

  const verificarResposta = (e) => {
    e.preventDefault();

    if (tentativa.trim().toLowerCase() === bairroDoDia.nome.toLowerCase()) {
      setAcertou(true);
      setMensagem("🎉 Parabéns! Você acertou o bairro do dia!");
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
  };

  return (
    <div className="game-container">
      <h2 className="game-title">
        Descubra qual o bairro de São Gonçalo do dia!
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
