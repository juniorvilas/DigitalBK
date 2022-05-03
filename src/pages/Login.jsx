import React from 'react';
import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';
import LoginForm from '../components/LoginForm/LoginForm';
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

function Login() {


  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Digital Booking | Login</title>
      </Helmet>
      <Header />
      <LoginForm />
      <Footer />
    </>
  );
}

export default Login
