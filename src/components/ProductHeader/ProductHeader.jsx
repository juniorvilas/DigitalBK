import "./productHeader.sass";
import React from 'react';
import { Link } from "react-router-dom";
const ProductHeader = ({nome, categoria}) => {
  const sessionStorage = window.sessionStorage;
  const productSession = JSON.parse(sessionStorage.getItem("product"));

  return (
    <>
      <div className="titulo_categoria">
        <div>
          <p className="categoria">{nome ? nome : productSession.nome }</p>
          <p className="titulo_det">{categoria ? categoria : productSession.categoria.nome }</p>
        </div>
        <Link className="link-back" to="/">
          <img
            src="https://pi-t2-g3.s3.amazonaws.com/icons/voltar.svg"
            alt="Pin Location"
          />
        </Link>
      </div>
    </>
  );
};

export default ProductHeader;
