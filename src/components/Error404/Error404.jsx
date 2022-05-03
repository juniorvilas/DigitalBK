import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDizzy } from '@fortawesome/free-solid-svg-icons';
import Header from '../../layouts/Header/Header'
import Footer from '../../layouts/Footer/Footer'
import './error404.sass';



const Error404 = ({headerOn = true, footerOn = true}) => {
    return (
      <>
        {headerOn && <Header ocultarFazerLogin={true} mostrarBtnCriarConta={true}/>}
        <div className="container">
          <FontAwesomeIcon icon={faDizzy} className="container__icon"/>
          <span>Página não encontrada</span>
        </div>
        {footerOn && <Footer />}
      </>
    )
  }
  
  export default Error404
  