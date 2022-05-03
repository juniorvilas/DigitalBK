import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';
import MyReservations  from '../components/MyReservations/MyReservations';
import React from 'react';

const Reservations = () => {
    return(
    <>
    <Header />
    <MyReservations />
    <Footer />
    </>);
}

export default Reservations;