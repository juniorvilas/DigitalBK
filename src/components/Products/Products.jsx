import "./Products.sass";
import React, { useState, useEffect } from "react";
import CardProduct from "../CardProduct/CardProduct";
import { useFilter } from "../../hooks/useFilter";
import { useProducts } from "../../hooks/useProducts";
import IsFetchingAnimation from '../IsFetchingAnimation/IsFetchingAnimation';
import api from "../../services/api";
import { format } from "date-fns";


const Products = () => {
  const { filter } = useFilter();
  const { products, setProducts } = useProducts();
  const [isFetching, setIsFetching] = useState(false);

  const filteringProductsByLocation = () => {
    setIsFetching(true);
    api
      .get(`/produtos/permitAll/buscar/cidades?nome-cidade=${filter.location}`)
      .then((res) => {
        setProducts(res.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const filteringProductsByCategory = () => {
    setIsFetching(true);
    api
      .get(
        `/produtos/permitAll/buscar/categorias?nome-categoria=${filter.category}`
      )
      .then((res) => {
        setProducts(res.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const getAllProducts = () => {
    setIsFetching(true);
    api
      .get("/produtos/permitAll")
      .then((res) => {
        setProducts(res.data.content);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error.response);
      });

  };

 /*  const filteringProductsByLocationAndDateInterval = () => {
    setIsFetching(true);
    const cidade = filter.location;
    const checkin = new Date(filter.checkin);
    const checkout = new Date(filter.checkout);
    const dataInicio = `${String(checkin.getFullYear())}-${String(checkin.getMonth() + 1).padStart(2, '0')}-${String(checkin.getDate()).padStart(2, '0')}`;
    const dataFim = `${String(checkout.getFullYear())}-${String(checkout.getMonth() + 1).padStart(2, '0')}-${String(checkout.getDate()).padStart(2, '0')}`;
    const url = `/produtos/permitAll/buscar?cidade=${cidade}&data-inicio=${dataInicio}&data-fim=${dataFim}&num-pessoas=${filter.qntyPersons}`;
    console.log("url: ", url)
    api
      .get(url)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => setIsFetching(false));

  };
 */
  const filteringProductsByLocationAndDateInterval = () => {
    setIsFetching(true);
    const checkIn = format(new Date(filter.checkin), "yyyy-MM-dd")
    const checkOut = format(new Date(filter.checkout), "yyyy-MM-dd")
    

    api
      .get(
        `/produtos/permitAll/buscar?cidade=${filter.location}&data-inicio=${checkIn}&data-fim=${checkOut}&num-pessoas=${filter.qntyPersons}`
      )
      .then((res) => {
        setProducts(res.data)
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
    
  };

  function isFilterNotEmpty() {
    if (
      filter.location &&
      filter.checkin &&
      filter.checkout &&
      filter.qntyPersons
    ) {
      return true;
    }
    if (
      !filter.location &&
      !filter.checkin &&
      !filter.checkout &&
      !filter.qntyPersons
    ) {
      return false;
    }
  }

  useEffect(() => {
    if (isFilterNotEmpty()) {
      filteringProductsByLocationAndDateInterval();
      // console.log("filteringProductsByLocationAndDateInterval")
    }
    else if (filter.location) {
      filteringProductsByLocation();
      // console.log("filteringProductsByLocation")
    }
    else if (filter.category) {
      filteringProductsByCategory();
      // console.log("filteringProductsByCategory")
    }
    else getAllProducts();
  }, [filter]);

  return (
    <>
      <div className="title-recommend">
        <h1>Recomendações</h1>
      </div>
      <div className="container-products">
        {!products && isFetching && <IsFetchingAnimation />}
        {products &&
          products.map((product) => {
            return <CardProduct key={product.id} product={product} />;
          })}
        {products && products.length === 0 && <span className="no-products">Nenhum produto encontrado.</span>}
      </div>
    </>
  );
};

export default Products;
