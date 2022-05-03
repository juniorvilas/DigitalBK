import React from "react";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import Categories from "../components/Categories/Categories";
import Search from "../components/Search/Search";
import Products from "../components/Products/Products";
import { Helmet, HelmetData } from "react-helmet-async";
import ProductsProvider from "../context/products";
import FilterProvider from "../context/filter";

const helmetData = new HelmetData({});

function Home() {

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Digital Booking | Home</title>
      </Helmet>
      <Header />
      <FilterProvider>
        <ProductsProvider>
          <Search />
          <Categories />
          <Products />
        </ProductsProvider>
      </FilterProvider>
      <Footer />
    </>
  );
}

export default Home;
