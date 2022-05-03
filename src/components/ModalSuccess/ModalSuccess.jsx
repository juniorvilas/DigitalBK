import "./ModalSuccess.sass";
import { useNavigate } from "react-router-dom";
import React from 'react';

function ModalSuccess({ texto = "Sua reserva foi realizada com sucesso! Pagamento Aprovado!" }) {

  const navigate = useNavigate();

  return (
    <div className="modal-info">
      <picture className="header__logoSuccess">
        <source media="(min-width:48em)" srcSet="https://pi-t2-g3.s3.amazonaws.com/icons/success.svg" />
        <img src="https://pi-t2-g3.s3.amazonaws.com/icons/success.svg" alt="logo_success" />
      </picture>
      <h2 className="subtitle">
        Muito obrigado!
      </h2>
      <p className="text">{texto}</p>
      <button className="btn-modal" onClick={() => navigate("/")}>
        Ok
      </button>
    </div>
  );
}

export default ModalSuccess;
