import "./myReservations.sass";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink } from "@fortawesome/free-solid-svg-icons";
import DetailsReservation from "./DetailsReservation/DetailsReservation"
import React from 'react';

const MyReservations = () => {
  const { user } = useUser();
  const { email } = user;

  const [reservations, setReservations] = useState();
  const [loading, setLoading] = useState(false);

  const getAllReservationsByEmail = (email) => {
    if (email) {
      setLoading(true)
      api
        .get(`/reservas/cliente/buscar?email-cliente=${email}`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              console.log(res.data);
              setReservations(res.data);

            }
          }
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getAllReservationsByEmail(email);
  }, [email]);

  return (
    <div className="reservations">
      <h2>Minhas reservas</h2>
      {reservations ? (
        <ul className="reservations__list">
          {reservations.map((reservation, index) => {
            return (
              <DetailsReservation reservation={reservation} key={index} />
            );
          })}
        </ul>
      ) : (
        <p className="empty">
          {loading ? "Carregando reservas..." : "Você ainda não fez nenhuma reserva"}
          <FontAwesomeIcon
            icon={faSmileWink}
            fontSize="42"
            color="var(--primary-color)"
          />
          <Link to="/" className="btn-filled">
            Voltar para home
          </Link>
        </p>
      )}
    </div>
  );
};

export default MyReservations;
