import "./amountOfPersonPicker.sass";
import { useFilter } from "../../../hooks/useFilter";
import React from 'react';

const AmountOfPersonPicker = () => {
  const { filter, setFilter } = useFilter();
  return (
    <>
      <input
        className="amount-person__input"
        type="number"
        step="1"
        min="0"
        defaultValue={filter.qntyPersons}
        required
        onChange={(e) => {
          setFilter((prevState) => {
            return { ...prevState, qntyPersons: e.target.value };
          });
        }}
      />
    </>
  );
};

export default AmountOfPersonPicker;
