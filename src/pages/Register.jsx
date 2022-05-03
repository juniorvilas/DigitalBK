import React from 'react';
import Footer from "../layouts/Footer/Footer"
import Header from "../layouts/Header/Header"
import RegisterForm from "../components/RegisterForm/RegisterForm"
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

const Register = () => {
  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Digital Booking | Registro</title>
      </Helmet>
      <Header />
      <RegisterForm />
      <Footer />
    </>
  )
}

export default Register