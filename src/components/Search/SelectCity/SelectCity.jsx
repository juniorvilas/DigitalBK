import "./selectCity.sass";
import api from "../../../services/api";
import React from 'react';
import { useState, useEffect } from "react";
import Select from 'react-select';

const customStyles = {
  container: provided => ({
    ...provided,
    width: "15rem",
    height: "3rem",
    fontSize: "1rem",
    "@media (max-width: 768px)": {
      ...provided,
      width: "100%"
    }
  }),
  input: provided => ({
    ...provided,
    width: "15rem",
    height: "2.3rem"
  }),
  option: provided => ({
    ...provided,
    "&:hover": {
      backgroundColor: "var(--primary-color"
    },
    color: "var(--dark-color-2)"
  }),
  control: provided => ({
    ...provided,
    backgroundColor: "var(--light-color)",
    borderRadius: ".5rem"
  })
}

const SelectCity = ({ getLocation }) => {
  const [options, setOptions] = useState();
  const getAllCities = () => {
    api
      .get("/cidades/permitAll")
      .then((res) => {
        setOptions(res.data.content);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!options) {
      getAllCities();
    }
  }, []);

  return (
    <Select 
    styles={customStyles}
    options={options}
    placeholder="Selecione uma cidade"
    onChange={e => getLocation(e.nome)}
    getOptionLabel={(options) => options['nome']}
    />
  );
};

export default SelectCity;
