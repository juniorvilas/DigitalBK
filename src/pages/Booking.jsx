import React from "react";
import { Helmet, HelmetData } from "react-helmet-async";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import Reservation from '../components/Reservation/Reservation';
import "../assets/sass/booking.sass";
const helmetData = new HelmetData({});


function Booking() {
  
  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Digital Booking | Formulário de Reserva</title>
      </Helmet>
      <Header />
      <Reservation />
      <Footer />
    </>
  );
}

export default Booking;
