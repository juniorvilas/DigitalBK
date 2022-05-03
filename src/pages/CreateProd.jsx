import React from 'react';
import Footer from "../layouts/Footer/Footer"
import Header from "../layouts/Header/Header"
import CreateForm from "../components/CreateForm/CreateForm"
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

const CreateProd = () => {
    return (
        <>
            <Helmet helmetData={helmetData}>
                <title>Digital Booking | Criar Propriedade</title>
            </Helmet>
            <Header />
            <CreateForm />
            <Footer />
        </>
    )
}

export default CreateProd;