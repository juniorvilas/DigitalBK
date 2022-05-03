import React from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ModalSuccess from '../components/ModalSuccess/ModalSuccess'
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

function Modal() {

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Digital Booking | Modal Reserva</title>
      </Helmet>
      <Header />
      <ModalSuccess />
      <Footer />
    </>
  );
}

export default Modal;
