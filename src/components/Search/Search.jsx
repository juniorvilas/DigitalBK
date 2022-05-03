import React, { useState } from "react";
import SelectCity from "./SelectCity/SelectCity";
import DataPickerHome from "./DataPickerHome/DataPickerHome";
import AmountOfPersonPicker from "./AmountOfPersonPicker/AmountOfPersonPicker";
import "./search.sass";

import { useFilter } from "../../hooks/useFilter";

const Search = () => {
  const [location, setLocation] = useState();
  const { setFilter } = useFilter();

  const getLocationFromSelect = (location) => {
    setLocation(location);
  };

  return (
    <section className="search">
      <h2 className="search__heading">
        Buscar ofertas em camping, casas e muito mais
      </h2>
      <SelectCity getLocation={getLocationFromSelect} />
      <DataPickerHome />
      <div className="amount-person">
        <label className="amount-person__label">Quantidade de pessoas</label>
        <AmountOfPersonPicker />
      </div>

      <button
        className="btn-filled"
        onClick={() => {
          setFilter((prevState) => {
            return { ...prevState, location: location };
          });
        }}
      >
        Buscar
      </button>
    </section>
  );
};

export default Search;
