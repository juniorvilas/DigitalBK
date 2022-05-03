import React, { useState, useEffect, createContext } from "react";
import { getValue, setValue } from "../utils/useSessionStorage";
import { isAfter } from 'date-fns';
export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    location: getValue("location"),
    checkin: getValue("checkin"),
    checkout: getValue("checkout"),
    qntyPersons: getValue("qntyPersons"),
    category: getValue("category"),
  });

  useEffect(() => {
    setValue("location", filter.location);
    setValue("checkin", filter.checkin);
    setValue("checkout", isAfter(new Date(filter.checkin), new Date(filter.checkout)) ? null : filter.checkout);
    setValue("qntyPersons", filter.qntyPersons);
    setValue("category", filter.category);
  }, [filter]);
  
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
