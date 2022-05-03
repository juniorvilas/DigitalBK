import React from 'react';
import Header from '../layouts/Header/Header'
import ProductId from '../components/ProductId/ProductId'
import Footer from '../layouts/Footer/Footer'
import { Helmet, HelmetData } from "react-helmet-async";
import ProductsProvider from "../context/products";

const helmetData = new HelmetData({});

function Product() {

    return (
        <>
            <Helmet helmetData={helmetData}>
                <title>Digital Booking | Produto</title>
            </Helmet>
            <Header />
            <ProductsProvider>
                <ProductId />
            </ProductsProvider>
            <Footer />
        </>
    );
}

export default Product