import "./Categories.sass";
import React, { useState, useEffect } from "react";
import Category from "./Category/Category";
import { useFilter } from "../../hooks/useFilter";
import IsFetchingAnimation from '../IsFetchingAnimation/IsFetchingAnimation';
import api from "../../services/api";
import { removeValue } from '../../utils/useSessionStorage';

const Categories = () => {
  const { filter, setFilter } = useFilter();
  const [categories, setCategories] = useState();

  const handleCategory = (category) => {
    setFilter(prevState => {return {...prevState, category}});
  };

  const clearFilter = () => {
    removeValue(["location","checkin","checkout","category","qntyPersons"]);
    setFilter({location: null, checkin: null, checkout: null, category: null, qntyPersons: null});
  };

  const getAllCategoriesFromApi = () => {
    api
      .get("/categorias/permitAll")
      .then((res) => {
        setCategories(res.data.content);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCategoriesFromApi();
  }, []);

  return (
    <>
      <div className="container-categorias">
        <h1 className="titulo">Busca por tipo de Camping</h1>
        <div className="categorias">
          {/* CATEGORIAS START */}
          {categories ?
            categories.map((category) => {
              return (
                <Category
                  handleCategory={handleCategory}
                  key={category.id}
                  img={category.urlImagem}
                  title={category.nome}
                  para={category.descricao}
                />
              );
            })
            :
            <IsFetchingAnimation />  
          }
        </div>{" "}
        {/* CATEGORIAS END */}
        <button
          className="btn-limpar-filtro"
          type="button"
          onClick={clearFilter}
          disabled={!filter.location && !filter.category ? true : false}
        >
          Limpar filtro
        </button>
      </div>
    </>
  );
};

export default Categories;
