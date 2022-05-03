import "./productDetails.sass";
import Modal from "react-modal";
import ModalSuccess from "../../ModalSuccess/ModalSuccess";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useFilter } from "../../../hooks/useFilter";
import { removeValue } from "../../../utils/useSessionStorage";
import api from "../../../services/api";
import AmountOfPersonPicker from "../../Search/AmountOfPersonPicker/AmountOfPersonPicker";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { getValue } from "../../../utils/useSessionStorage";
import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentModal } from "../PaymentModal/PaymentModal";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    borderColor: "transparent",
    boxShadow: "0px 5px 25px 5px rgba(0,0,0,0.25)",
    zIndex: 10000,
  },
};
const BookingDetails = () => {
  const { user } = useUser();
  const { filter } = useFilter();
  const { checkin, checkout } = filter;
  const [amountReservation, setAmountReservation] = useState(filter.qntyPersons * 35/* productObj.valorPorPessoa  */);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [successReservation, setSuccessReservation] = useState(false);
  const [idReservation, setIdReservation] = useState();
  let tempCheckin = null;
  let tempCheckout = null;
  const productObj = getValue("product");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    const amount = filter.qntyPersons * productObj.valorPorPessoa;
    setAmountReservation(amount)
  }, [filter.qntyPersons])
  // console.log("amountReservation", amountReservation)


  const returnAllDataToReservation = () => {
    const horarioCheckin = JSON.parse(getValue("horario_checkin"));
    return {
      horarioInicio: horarioCheckin + ":00:00",
      dataInicio: filter.checkin ? new Date(filter.checkin) : null,
      dataFinal: filter.checkout ? new Date(filter.checkout) : null,
      produto: { id: productObj.id },
      usuario: { id: user.id },
      qtdPessoas: filter.qntyPersons,
      valorTotal: amountReservation
    };
  };

  function createReservation() {
    const obj = returnAllDataToReservation();
    console.log(obj.qtdPessoas);

    if (!obj.qtdPessoas || obj.qtdPessoas == 0) {
      Toast.fire({
        icon: "warning",
        title: "Selecione a quantidade de pessoas",
      });
    } else if (obj.dataInicio === null || obj.dataFinal === null) {
      Toast.fire({
        icon: "warning",
        title: "Selecione o check-in e o check-out",
      });
    } else if (obj.horarioInicio.includes("null")) {
      Toast.fire({
        icon: "warning",
        title: "Selecione o horário do check-in",
      });
    } else {
      api
        .post("/reservas/cliente/salvar", obj)
        .then((res) => {
          if (res.status === 201) {
            setIsOpen(true);
            setIdReservation(res.data.id)
            console.log(res.data)
            removeValue([
              "checkin",
              "checkout",
              "qntyPersons",
              "horario_checkin",
            ]);
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            Toast.fire({
              icon: "warning",
              title: error.response.data.mensagem,
              showConfirmButton: true,
              timer: false,
            });
          }
        });
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    <Elements stripe={stripePromise}>
      <div className="booking-details">
        <div className="booking-details__img">
          <h5>Detalhe da reserva</h5>
          <img src={productObj.imagens[0].url} alt="foto do camping" />
        </div>
        <div className="booking-details__info">
          <span className="booking-details__name">
            {productObj.categoria.nome}
          </span>
          <div className="booking-details__price">
            <span>Valor da diária:</span>
            {new Intl.NumberFormat("pt-BR", {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            }).format(productObj.valorPorPessoa || "35")}/pessoa
          </div>
          <h5>{productObj.name}</h5>
          <div className="booking-details__stars">
            <img
              src="https://pi-t2-g3.s3.amazonaws.com/icons/star.svg"
              alt="estrelas"
            />
            <img
              src="https://pi-t2-g3.s3.amazonaws.com/icons/star.svg"
              alt="estrelas"
            />
            <img
              src="https://pi-t2-g3.s3.amazonaws.com/icons/star.svg"
              alt="estrelas"
            />
            <img
              src="https://pi-t2-g3.s3.amazonaws.com/icons/star.svg"
              alt="estrelas"
            />
            <img
              src="https://pi-t2-g3.s3.amazonaws.com/icons/star.svg"
              alt="estrelas"
            />
          </div>
          <span className="booking-details__location">
            {productObj.cidade.nome}
          </span>
          <div className="booking-details__checkin">
            <span>Check in</span>
            <span>
              {tempCheckin
                ? new Intl.DateTimeFormat("pt-BR").format(
                  new Date(tempCheckin),
                  1
                )
                : "__/__/____"}
            </span>
          </div>
          <div className="booking-details__checkout">
            <span>Check out</span>
            <span>
              {tempCheckout
                ? new Intl.DateTimeFormat("pt-BR").format(
                  new Date(tempCheckout),
                  1
                )
                : "__/__/____"}
            </span>
          </div>
          <div className="booking-details__amount">
            <span>Valor total</span>
            <span>
              {new Intl.NumberFormat("pt-br", {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              }).format(amountReservation)}
            </span>
          </div>
          <div className="booking-details__qntyPersons">
            <span>Quantidade de pessoas</span>
            <AmountOfPersonPicker />
          </div>

          <button className="btn-filled" onClick={createReservation}>
            Confirmar reserva
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}
      >
        {successReservation ?
          <ModalSuccess />
          :
          <PaymentModal
            product={productObj}
            amount={amountReservation}
            setSuccess={setSuccessReservation}
            idReserva={idReservation} />
        }
      </Modal>
    </Elements>
  );
};

export default BookingDetails;
