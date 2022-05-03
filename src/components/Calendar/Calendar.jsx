import "./calendar.sass";
import React from 'react';
import {
  format,
  getDaysInMonth,
  startOfMonth,
  isEqual,
  isBefore,
  isAfter,
  addMonths,
  subMonths,
  getMonth,
  addYears,
  getYear,
  isPast,
  parseISO,
} from "date-fns";
import { pt } from "date-fns/locale";
import { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dia from "./Dia/Dia";
import { useFilter } from "../../hooks/useFilter";

// 0[DOMINGO] | 1[SEGUNDA] | 2[TERÇA] | 3[QUARTA] | 4[QUINTA] | 5[SEXTA] | 6[SÁBADO]

const Calendario = ({ title, datasIndisponiveis=[] }) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const { filter, setFilter } = useFilter();
  const { checkin, checkout } = filter;

  let daysToRender = {
    thisMonth: [],
    nextMonth: [],
  };

  const getNumberOfBlankSpace = (firstDay) => {
    let numOfBlankSpace = 0;
    switch (firstDay) {
      case 0:
        numOfBlankSpace = 6;
        break;
      case 1:
        numOfBlankSpace = 0;
        break;
      case 2:
        numOfBlankSpace = 1;
        break;
      case 3:
        numOfBlankSpace = 2;
        break;
      case 4:
        numOfBlankSpace = 3;
        break;
      case 5:
        numOfBlankSpace = 4;
        break;
      case 6:
        numOfBlankSpace = 5;
        break;
    }
    return numOfBlankSpace;
  };

  (() => {
    let numOfBlankSpace = getNumberOfBlankSpace(startOfMonth(date).getDay());

    for (let i = 1; i <= numOfBlankSpace; i++) {
      daysToRender.thisMonth.push("");
    }
    for (let i = 1; i <= getDaysInMonth(date); ++i) {
      daysToRender.thisMonth.push(i);
    }
  })();

  (() => {
    let nextMonth = addMonths(date, 1);

    let numOfBlankSpace = getNumberOfBlankSpace(
      startOfMonth(nextMonth).getDay()
    );

    for (let i = 1; i <= numOfBlankSpace; i++) {
      daysToRender.nextMonth.push("");
    }
    for (let i = 1; i <= getDaysInMonth(nextMonth); ++i) {
      daysToRender.nextMonth.push(i);
    }
  })();

  const previousMonthHandler = () => {
    if (!isPast(date, 1)) {
      setDate(subMonths(date, 1));
    }
  };

  const nextMonthHandler = () => {
    setDate(addMonths(date, 1));
  };

  const getDateByDay = (day, nextMonth) => {
    if (day) {
      if (nextMonth) {
        return new Date(getYear(date), getMonth(date) + 1, day);
      } else {
        return new Date(getYear(date), getMonth(date), day);
      }
    }
    return "";
  };

  const checkInOutHandler = (date) => {
    if (checkin && checkout) {
      setFilter((prevState) => {
        return { ...prevState, checkin: date, checkout: null };
      });
    } else if (checkin) {
      if (isBefore(date, checkin)) {
        setFilter((prevState) => {
          return { ...prevState, checkin: date, checkout: prevState.checkin };
        });
      } else {
        setFilter((prevState) => {
          return { ...prevState, checkout: date };
        });
      }
    } else {
      setFilter((prevState) => {
        return { ...prevState, checkin: date };
      });
    }
  };

  return (
    <>
      <h4 className="calendario-title">{title}</h4>
      <div className={`calendario`}>
        <button
          className="calendario__btn calendario__previous"
          onClick={previousMonthHandler}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="calendario__this-month">
          <div className="calendario_title">
            <h5>
              {format(date, "LLLL", { locale: pt })} {format(date, "yyyy")}
            </h5>
          </div>
          <div className="calendario__titulo-dias">
            <span className="calendario__dia-semana">S</span>
            <span className="calendario__dia-semana">T</span>
            <span className="calendario__dia-semana">Q</span>
            <span className="calendario__dia-semana">Q</span>
            <span className="calendario__dia-semana">S</span>
            <span className="calendario__dia-semana">S</span>
            <span className="calendario__dia-semana">D</span>
          </div>
          <div className="calendario__dias">
            {daysToRender.thisMonth.map((n, index) => {
              const date = getDateByDay(n);

              const checkReservation = (dateReservation) => {
                let parsedDate = new Date(date);
                return isEqual(parseISO(dateReservation),parsedDate);
              };

              const reserved = datasIndisponiveis.find(checkReservation);

              const validations = {
                isBetween: null,
                isCheckin: null,
                isCheckout: null,
              };

              if (checkin) {
                validations.isCheckin = isEqual(
                  new Date(date),
                  new Date(checkin)
                );
              }

              if (checkout) {
                validations.isCheckout = isEqual(
                  new Date(date),
                  new Date(checkout)
                );
              }
              
              if (checkin && checkout) {
                validations.isBetween =
                  isAfter(new Date(date), new Date(checkin)) &&
                  isBefore(new Date(date), new Date(checkout))
                    ? true
                    : false;
              }

              return (
                <Dia
                  key={index}
                  date={date}
                  isReserved={reserved}
                  checkInOutHandler={checkInOutHandler}
                  isBetween={validations.isBetween}
                  isCheckin={validations.isCheckin}
                  isCheckout={validations.isCheckout}
                />
              );
            })}
          </div>
        </div>
        <div className="calendario__next-month">
          <div className="calendario_title">
            <h5>
              {format(addMonths(date, 1), "MMMM", { locale: pt })}{" "}
              {getMonth(date) === 11
                ? format(addYears(date, 1), "yyyy")
                : format(date, "yyyy")}
            </h5>
          </div>
          <div className="calendario__titulo-dias">
            <span className="calendario__dia-semana">S</span>
            <span className="calendario__dia-semana">T</span>
            <span className="calendario__dia-semana">Q</span>
            <span className="calendario__dia-semana">Q</span>
            <span className="calendario__dia-semana">S</span>
            <span className="calendario__dia-semana">S</span>
            <span className="calendario__dia-semana">D</span>
          </div>
          <div className="calendario__dias">
            {daysToRender.nextMonth.map((n, index) => {
              var date = getDateByDay(n, true);

              const checkReservation = (dateReservation) => {
                let parsedDate = new Date(date);
                return isEqual(parseISO(dateReservation),parsedDate);
              };

              let reserved = datasIndisponiveis.find(checkReservation);


              const validations = {
                isBetween: null,
                isCheckin: null,
                isCheckout: null,
              };

              if (checkin) {
                validations.isCheckin = isEqual(
                  new Date(date),
                  new Date(checkin)
                );
              }

              if (checkout) {
                validations.isCheckout = isEqual(
                  new Date(date),
                  new Date(checkout)
                );
              }
              
              if (checkin && checkout) {
                validations.isBetween =
                  isAfter(new Date(date), new Date(checkin)) &&
                  isBefore(new Date(date), new Date(checkout))
                    ? true
                    : false;
              }

              return (
                <Dia
                  key={index + 100}
                  date={date}
                  isReserved={reserved}
                  checkInOutHandler={checkInOutHandler}
                  isBetween={validations.isBetween}
                  isCheckin={validations.isCheckin}
                  isCheckout={validations.isCheckout}
                />
              );
            })}
          </div>
        </div>
        <button
          className="calendario__btn calendario__next"
          onClick={nextMonthHandler}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </>
  );
};

export default Calendario;
