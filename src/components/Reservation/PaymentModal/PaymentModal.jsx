import "./paymentModal.sass";
import React from "react"
import api from "../../../services/api";
import StripeCheckout from "react-stripe-checkout";
import {
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PaymentModal = (props) => {

  const handleToken = async (token, addresses) => {
    const cliente = {
      nome: token.card?.name,
      email: token?.email,
      cidade: token.card?.address_city,
      pais: token.card?.address_country,
      bandeiraCartao: token.card?.brand,
    }

    const body = {
      valor: Math.round(props.amount * 100),
      tokenId: token.id,
      descricao: `Pagamento efetuado para o camping: ${props.product.nome}. Cliente: { nome: ${cliente.nome}, email: ${cliente.email}, cidade: ${cliente.cidade}/${cliente.pais} }`,
      moeda: "BRL",
      reserva: {
        id: props.idReserva
      }
    };
    const orderPayment = await api.post("pagamentos", body)
    console.log(body)
    const data = orderPayment.data
    if (orderPayment.status === 200) {
      const reserva = await api.put("reservas/cliente/atualizar", {
        reservaId: props.idReserva,
        ordemDePagamentoId: data.id
      })

      if (reserva.status === 200) {
        props.setSuccess(true)
      } else {
        Toast.fire({
          icon: "error",
          title: "Falha ao atualizar status da reserva!",
          showConfirmButton: true,
          timer: false,
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Falha ao realizar pagamento",
        showConfirmButton: true,
        timer: false,
      });
    }
  }

  return (
    <div className="modal-payment">
      <h2>Eba! Reserva registrada com sucesso em nossos sistemas.<b> Realize o pagamento agora mesmo para efetivá-la e garantir seu agendamento!</b></h2>
      <FontAwesomeIcon icon={faCreditCard} className="modal-payment-icon" />
      <p>Produto: {props.product.nome}</p>
      <p>Valor total: {new Intl.NumberFormat("pt-br", {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(props.amount)}</p>
      <StripeCheckout
        currency="BRL"
        billingAddress
        // shippingAddress
        token={handleToken}
        amount={props.amount * 100}
        label="Realizar Pagamento 💳"
        stripeKey={import.meta.env.VITE_PUBLISHABLE_KEY}
        name={"Digital Booking - " + props.product.nome}
        image="https://pi-t2-g3.s3.amazonaws.com/icons/logo.svg"
      />
    </div>
  )
}
