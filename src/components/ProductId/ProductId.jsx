import "./ProductId.sass";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductHeader from '../ProductHeader/ProductHeader';
import Carousel from "react-bootstrap/Carousel";
import { faShareAlt, faHeart, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Gallery } from "./Gallery/Gallery";
import Calendar from "../Calendar/Calendar";
import Map from "./Map/Map";
import PoliticaInfo from "../PoliticaInfo/PoliticaInfo";
import IsFetchingAnimation from "../IsFetchingAnimation/IsFetchingAnimation";
import api from "../../services/api";


import { getValue, setValue } from '../../utils/useSessionStorage';

const Caracteristica = ({ nome, icon }) => {
  return (
    <div className="item_icone">
      <img src={icon} alt="ícone caracteristica" />
      <p>{nome}</p>
    </div>
  );
};

const ProductId = () => {
  let { id } = useParams();
  const Navigate = useNavigate();
  const [isModalGalleryOpen, setIsModalGalleryOpen] = useState(false);
  const [product, setProduct] = useState();

/*   useEffect(() => {
    if (!getValue("product"))
      return

    console.log("product: ", getValue("product"))
    setProduct(getValue("product"))
  }, [])
 */
  console.log(product);
  const getProductById = (id) => {
    if (id) {
      api
        .get(`/produtos/permitAll/buscar/${id}`)
        .then((res) => {
          setProduct(res.data);
          setValue("product", res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  if (isModalGalleryOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    getProductById(id);
  }, []);

  const modalHandler = () => {
    setIsModalGalleryOpen(() => !isModalGalleryOpen);
  };

  const sendToReservation = () => {
    Navigate(`/reserva/${product.id}`);
  };

  return (
    <div className="product_id">
      {product ? (
        <>
          <ProductHeader nome={product.nome} categoria={product.categoria.nome} />
          {/* Bloco de product__btn btn--altlocalização */}
          <div className="div_location">
            <img
              src="https://pi-t2-g3.s3.amazonaws.com/icons/pin_location.svg"
              alt="Pin Location"
            />
            <p className="location_det">{product.cidade.nome}</p>
          </div>
          {/* Bloco de compartilhar e favoritar somente Tablete e Desktop */}
          <div className="div_compartilhar">
            <FontAwesomeIcon icon={faShareAlt} />
            <FontAwesomeIcon icon={faHeart} />
          </div>
          {/* Bloco Carousel Imagens */}
          <Carousel className="carousel">
            {product.imagens.map((img, index) => {
              return (
                <Carousel.Item key={img.url}>
                  <img
                    className="d-block w-100"
                    src={img.url}
                    alt={img.titulo}
                  />
                  <Carousel.Caption>
                    <p className="quant_img">{index + 1}/5</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
          {/* Bloco Galeria Imagens */}
          <div className="container_galeria">
            {product.imagens.map((img, index) => {
              return (
                <div key={img.url} className={`img${index + 1}`}>
                  <img src={img.url} alt={img.titulo} />
                </div>
              );
            })}
            <button className="ver_mais" onClick={modalHandler}>
              Ver mais
            </button>
          </div>
          {/* Bloco de descrição */}
          <div className="descricao">
            <p className="titulo_descricao">Venha acampar em {product.nome}</p>
            <p className="texto_descricao">{product.descricao}</p>
          </div>
          <div className="icones">
            <div className="icone_titulo">
              <p className="titulo_icones">O que esse lugar oferece?</p>
            </div>
            {/* Bloco de características do produto */}
            <div className="container_icones_flex">
              {product.caracteristicas.map((caracteristica) => {
                return (
                  <Caracteristica
                    key={caracteristica.id}
                    icon={caracteristica.icone}
                    nome={caracteristica.nome}
                  />
                );
              })}
            </div>
            {/* Bloco de datas disponiveis - RESERVA */}
            <div className="availables-dates">
              <Calendar title={"Datas disponíveis"} datasIndisponiveis={product.datasIndisponiveis} />
              <div className="availables-dates__reserva">
                <p className="availables-dates__product-price">
                  <FontAwesomeIcon icon={faCircleDollarToSlot} className="product__mapIcon" />
                  <b>Diária: </b> {new Intl.NumberFormat("pt-BR", {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  }).format(product.valorPorPessoa || "35")}/pessoa
                </p>
                <p>Adicione as datas da sua viagem para obter preços exatos</p>
                <button className="btn-filled" onClick={sendToReservation}>
                  Iniciar reserva
                </button>
              </div>
              <div></div>
            </div>
            {/* BLOCO MAPA*/}
            <Map product={product} />
            {/* Bloco da política do produto */}
            <PoliticaInfo />
          </div>
        </>
      ) : (
        <IsFetchingAnimation text="Carregando informações..." />
      )}
      {isModalGalleryOpen && (
        <Gallery close={modalHandler} imagesApi={product.imagens} />
      )}
    </div>
  );
};

export default ProductId;
