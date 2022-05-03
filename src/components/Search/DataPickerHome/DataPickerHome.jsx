import "./dataPickerHome.sass";
import Calendar from "../../Calendar/Calendar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useFilter } from "../../../hooks/useFilter";
import { getValue } from "../../../utils/useSessionStorage";
import React from 'react';

const DataPickerHome = () => {
  const { filter } = useFilter();
  const { checkin, checkout } = filter;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  let tempCheckin = null;
  let tempCheckout = null;
  const changeCalendarStatus = () => {
    setIsCalendarOpen((prevState) => !prevState);
  };

  if (checkin) {
    tempCheckin = checkin;
  } else if (getValue("checkin")) {
    tempCheckin = getValue("checkin");
  }

  if (checkout) {
    tempCheckout = checkout;
  } else if (getValue("checkout")) {
    tempCheckout = getValue("checkout");
  }
  
  return (
    <div className="data-picker">
      <input
        type="text"
        className="data-picker__input"
        value={
          tempCheckin
            ? new Intl.DateTimeFormat("pt-BR").format(new Date(tempCheckin), 1)
            : ""
        }
        readOnly
        placeholder="Check in"
      />
      <FontAwesomeIcon
        icon={faCalendar}
        className="calendar-icon checkin-icon"
        onClick={changeCalendarStatus}
      />
      <input
        type="text"
        className="data-picker__input"
        value={
          tempCheckout
            ? new Intl.DateTimeFormat("pt-BR").format(new Date(tempCheckout), 1)
            : ""
        }
        readOnly
        placeholder="Check out"
      />
      <FontAwesomeIcon
        icon={faCalendar}
        className="calendar-icon checkout-icon"
        onClick={changeCalendarStatus}
      />
      {isCalendarOpen && <Calendar isOpen={isCalendarOpen} />}
    </div>
  );
};

export default DataPickerHome;

("/produtos/permitAll/buscar?cidade=ubatuba&data-inicio=2022-04-05&data-fim=2022-04-06&num-pessoas=5");
