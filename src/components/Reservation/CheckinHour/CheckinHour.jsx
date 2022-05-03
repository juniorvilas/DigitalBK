import "./checkinHour.sass";
import { getHours, setHours } from "date-fns";
import Select from "react-select";
import { getValue, setValue } from "../../../utils/useSessionStorage";
import { useState } from "react";
import React from 'react';

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "15rem",
    height: "3rem",
    fontSize: "1rem",
  }),
  input: (provided) => ({
    ...provided,
    width: "15rem",
    height: "2.3rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--light-color)"
      : "var(--light-color)",
    color: "var(--dark-color-2)",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: ".5rem",
  }),
};
const BookingHorario = () => {
  const arrayHours = [];
  const [isHourSelected, setIsHourSelected] = useState(false);

  for (let i = 10; i < 24; i++) {
    arrayHours.push(setHours(new Date(Date.now()), i));
  }


  return (
    <>
      <h4 className="booking-horario-title">Seu horário de chegada</h4>
      <div className="booking-horario">
        <p className={`${isHourSelected && "clock-filter-color"}`}>
          Seu quarto estará pronto para check-in entre 10h00 e 23h00
        </p>
        <span>Indique sua hora prevista de chegada</span>
        <Select
          styles={customStyles}
          options={arrayHours}
          onChange={(e) =>{ 
            setValue("horario_checkin", getHours(e))
            if(getValue("horario_checkin")) setIsHourSelected(true);
          }}
          getOptionLabel={(arrayHours) => getHours(arrayHours) + ":00"}
        />
      </div>
    </>
  );
};

export default BookingHorario;
