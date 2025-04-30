import "./ComoJogarContent.css";

const ComoJogarContent = () => {
  return (
    <div className="comojogar-container">
      <h1>Tutorial de como jogar</h1>
      <div className="comojogar-regras">
        <ul>
          <li className="comojogar-padrao">
            <h2>
              Modo Padrão: A cada 24 horas, um novo bairro será escolhido.
            </h2>
            <p>
              1 - Você tem infinitas tentativas para acertar o bairro do dia.
            </p>
            <p>
              2 - Todos os bairros possuem um total de 5 imagens de diferentes
              locais.
            </p>
            <p>
              3 - A cada erro, a imagem será trocada pela próxima imagem do
              mesmo bairro.
            </p>
          </li>
          <li className="comojogar-livre">
            <h2>
              Modo Livre: No modo livre, você basicamente joga um modo infinito
              até errar.
            </h2>
            <p>1 - Você tem até 5 tentativas por bairro.</p>
            <p>2 - Caso você acerte, suas tentativas serão zeradas.</p>
            <p>
              3 - A cada erro, a imagem será trocada pela próxima imagem do
              mesmo bairro.
            </p>
            <p>4 - Se você perder todas as tentativas, é GG.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ComoJogarContent;
