import "./ComoJogarContent.css";

const ComoJogarContent = () => {
  return (
    <div className="comojogar-container">
      <h1>Tutorial de como jogar</h1>
      <div className="comojogar-regras">
        <ul>
          <li className="comojogar-padrao">
            <h2>Modo Padrão: A cada 24 horas um novo bairro sera escolhido </h2>
            <p>
              1 - Você tem infinitas tentativas para acertar o bairro do dia.
            </p>
            <p>
              2 - Todos os bairros possuiem um total de 5 imagens de diferentes
              locais do bairro.
            </p>
            <p>
              3 - A cada erro a imagem sera trocada para a proxima imagem do
              mesmo bairro.
            </p>
          </li>
          <li className="comojogar-livre">
            <h2>
              Modo Livre: No modo livre você basicamente joga um modo INFINITO
              até você errar.
            </h2>
            <p>1 - Você tem até 5 tentativas por bairro.</p>
            <p>2 - Caso você acerte suas tentavias serão zeradas.</p>
            <p>
              3 - A cada erro a imagem sera trocada para a proxima imagem do
              mesmo bairro.
            </p>
            <p>4 - Se você perder todas tentativas é GG.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ComoJogarContent;
