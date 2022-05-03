import './politicaInfo.sass'
import React from 'react';

const PoliticaInfo = () => {
  return (
    <>
      <div className="div_titulo-politica">
        <h2 className="titulo_politica">O que você precisa saber</h2>
      </div>
      <div className="container_politica_flex">
        <div className="item_politica">
          <h3 className="subtitulo_politica">Regras da casa</h3>
          <p>Check-out 12:00</p>
          <p>Não é permitido barulho</p>
        </div>
        <div className="item_politica">
          <h3 className="subtitulo_politica">Saúde e segurança</h3>
          <p>
            Diretrizes de distanciamento social e outras regulamentações
            relacionadas ao coranavirus se aplicam
          </p>
        </div>
        <div className="item_politica">
          <h3 className="subtitulo_politica">Política de cancelamento</h3>
          <p>
            Adicione as datas da viagem para obter detalhes de cancelamento para
            esta estadia
          </p>
        </div>
      </div>
    </>
  );
};


export default PoliticaInfo;