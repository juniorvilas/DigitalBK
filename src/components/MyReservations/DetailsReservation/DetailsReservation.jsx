import { format, parseISO } from 'date-fns';
import { useState, useEffect } from "react";
import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import api from "../../../services/api";

const DetailsReservation = ({ reservation }) => {

    const [imgThumbnail, setImgThumbnail] = useState();

    useEffect(() => {
        if (reservation) {
            reservation.produto.imagens.forEach((imagem) => {
                if (imagem.ehImagemCapa) setImgThumbnail(imagem.url);
            })

        }
    })

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

    const handleToken = async (token, addresses) => {
        const cliente = {
            nome: token.card?.name,
            email: token?.email,
            cidade: token.card?.address_city,
            pais: token.card?.address_country,
            bandeiraCartao: token.card?.brand,
        }
        console.log(token)
        console.log(cliente)

        const body = {
            id: reservation.ordemDePagamento?.id,
            valor: Math.round(reservation.valorTotal * 100),
            tokenId: token.id,
            descricao: `Pagamento efetuado para o camping: ${reservation.produto.nome}. Cliente: { nome: ${cliente.nome}, email: ${cliente.email}, cidade: ${cliente.cidade}/${cliente.pais} }`,
            moeda: "BRL",
            reserva: {
                id: reservation.id
            }
        };
        if (!reservation.ordemDePagamento)
            delete body.id

        const orderPayment = await api.post("pagamentos", body)
        console.log(body)
        const data = orderPayment.data
        if (orderPayment.status === 200) {
            const reserva = await api.put("reservas/cliente/atualizar", {
                reservaId: reservation.id,
                ordemDePagamentoId: data.id
            })

            if (reserva.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Muito obrigado! Pagamento realizado com secesso!",
                    showConfirmButton: true,
                    timer: false,
                });
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
        <>
            <li className="reservations__item">
                {reservation.status === "PENDENTE" &&
                    <div className="reservations__item__pendente">
                        <StripeCheckout
                            currency="BRL"
                            billingAddress
                            // shippingAddress
                            token={handleToken}
                            amount={reservation.valorTotal * 100}
                            label="Realizar Pagamento 💳"
                            stripeKey={import.meta.env.VITE_PUBLISHABLE_KEY}
                            name={"Digital Booking - " + reservation.produto.nome}
                            image="https://pi-t2-g3.s3.amazonaws.com/icons/logo.svg"
                        />
                    </div>
                }
                <img src={imgThumbnail} alt="" />
                <span className="reservations__name">
                    {reservation.produto.nome}
                </span>
                <span className="reservations__checkin">
                    {format(parseISO(reservation.dataInicio), "dd/MM/yyyy - ")}
                    {reservation.horarioInicio.slice(0, 5)}
                </span>
                <span className="reservations__checkout">
                    {format(parseISO(reservation.dataFinal), "dd/MM/yyyy")}
                </span>
                <span className="reservations__location">
                    {reservation.produto.cidade.nome}
                </span>
                <span className="reservations_quant">
                    {reservation.qtdPessoas}
                </span>
                <span className="reservations__status">
                    {reservation.status}
                </span>
                <span className="reservations_valorTotal">
                    {new Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency"
                    }).format(reservation.valorTotal)}
                </span>
            </li>
        </>

    );
}

export default DetailsReservation;