import "./createform.sass";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import apiCep from "../../services/apiCep";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import AddImage from "./AddImage/AddImage";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";
import ModalSuccess from "../ModalSuccess/ModalSuccess";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Modal from "react-modal";
import apiMapbox from "../../services/apiMapbox";
import Map from "../ProductId/Map/Map";

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

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid var(--light-color)",
    color: state.isSelected ? "var(--primary-color)" : "var(--dark-color-2)",
    padding: 20,
    fontSize: "1rem"
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(var(--light-color-rgb), .5)",
    fontSize: "1rem",
    borderColor: state.isFocused
      ? "var(--primary-color)"
      : "transparent",
  }),
};
const CreateForm = () => {
  const [cookies] = useCookies([]);

  /* ESTADOS */
  const [categorySelect, setCategorySelect] = useState();
  const [categorias, setCategorias] = useState();
  const [cidades, setCidades] = useState();
  const [cep, setCep] = useState();
  const [address, setAddress] = useState();
  const [img, setImage] = useState([]);
  const [selectedFeatures, setFeatures] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [isModalOpen, setModalStatus] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [prodCoords, setProdCoords] = useState(null);
  const [thumbnail, setThumbnail] = useState();
  const [nomeCamping, setNomeCamping] = useState("");

  /*FUNÇÕES DA CATEGORIA */
  const style = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused
        ? "var(--primary-color) !important"
        : "transparent !important",
      fontSize: 15,
      boxShadow: "0px 1px 5px rgb(0 0 0 / 15%)",
    }),
  };

  const getAllCategoriesFromApi = () => {
    api
      .get("/categorias/permitAll")
      .then((res) => {
        setCategorias(res.data.content);
      })
      .catch((error) => console.log(error));
  };

  const getAllCitiesFromApi = () => {
    api
      .get("/cidades/permitAll")
      .then((res) => {
        setCidades(res.data.content);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!categorias) {
      getAllCategoriesFromApi();
    }
    if (!cidades) {
      getAllCitiesFromApi();
    }
    if (caracteristicas.length === 0) {
      getAllCaracteristicasFromApi();
    }
  }, []);


  /* FUNÇÕES PARA CEP   */
  /* Salva o nome do camping quando no onclick do CEP   */
  const getCepFromApi = () => {
    if (cep) {
      apiCep
        .get(`/${cep}`)
        .then((res) => {
          setAddress(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  /* busca as coordenadas de um endereço informado em string*/
  const getCoordinates = async (endereco, cidade) => {
    if (cidade && endereco) {
      let addressString = `${endereco.replaceAll(" ", "%20")},%20${cidade.replaceAll(" ", "%20")}`
      let token_mapbox = "pk.eyJ1IjoiamFyZGVsb2wiLCJhIjoiY2wxcjB4cGozMDd2eDNsb2YxZGhpejRibCJ9._l09TWULOHc1yqWtCobxJQ"
      let url = `${addressString}.json?types=address&country=BR&access_token=${token_mapbox}`
      let data = await (await apiMapbox.get(url)).data
      const city = data.features.reduce(function (prev, current) {
        return (prev.relevance > current.relevance) ? prev : current
      })
     const coords = {
        latitude: city.center[1],
        longitude: city.center[0]
      }

      return {
        coords: coords,
        placeName: city.place_name
      }
    } else {
      Toast.fire({ icon: "warning", title: "Falha ao buscar sua localização. Por favor recarregue a página, verifique os campos e tente novamente, caso o erro persista tente novamente mais tarde!" });
    }
  }

  /*ADD IMAGENS NO ARRAY */
  const getImg = (imageObj) => {
    let imageAlreadyExists = img.find((image) => image.url === imageObj.url);
    if (imageAlreadyExists) {
      Toast.fire({
        icon: "warning",
        title: "Imagem já existente.",
      });
    } else {
      setImage((oldImageArray) => [...oldImageArray, imageObj]);
    }
  };

  /* EXCLUI IMAGENS DO ARRAY */
  const deleteImg = (url) => {
    let newImageArray = img.filter((item) => item.url !== url);
    setImage(newImageArray);
  };

  /*BUSCAR ATRIBUTOS QUE JÁ EXISTEM NO BACKEND */
  const getAllCaracteristicasFromApi = () => {
    api
      .get("/caracteristicas", {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      })
      .then((res) => {
        setCaracteristicas(res.data.content);
      })
      .catch((error) => console.log(error));
  };

  /* FUNÇÃO QUE EDITA O NOME DOS ATRIBUTOS NO CASO DE ID PARA VALUE E NOME PARA LABEL */
  const editarNomeAtributo = (array) => {
    return array.map((entry) => {
      return Object.keys(entry).reduce((obj, key) => {
        const value = entry[key];
        if (key === "id") key = "value";
        if (key === "nome") key = "label";
        obj[key] = value;
        return obj;
      }, {});
    });
  };

  /* FUNÇÃO QUE EDITA O NOME DOS ATRIBUTOS PARA ENVIAR PARA API */
  const editarNomeAtributoParaApi = (array) => {
    return array.map((entry) => {
      return Object.keys(entry).reduce((obj, key) => {
        const value = entry[key];
        if (key === "value") key = "id";
        if (key === "label") key = "nome";
        obj[key] = value;
        return obj;
      }, {});
    });
  };

  var Toast = Swal.mixin({
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

  /* FUNÇÃO QUE SALVA TODOS PARÂMETROS DO FORM EM UM OBJ  */
  const createProduct = (product) => {
    const atributosEditados = editarNomeAtributoParaApi(selectedFeatures);
    const productApi = {
      ...product,
      categorySelect,
      atributosEditados,
      img,
    };

    let cidadeProduto = null
    for (let cidade of cidades) {
      if (cidade.nome.toLowerCase() == productApi.cidade.toLowerCase()) {
        cidadeProduto = cidade
      }
    }

    let newImgArray = img.map( img => {
      if(img.url === thumbnail) {
        img.ehImagemCapa = true;
      } else {
        img.ehImagemCapa = false;
      }
      return img
    })

    return {
      nome: productApi.nome,
      descricao: productApi.descricao,
      latitude: productApi.coords.latitude,
      longitude: productApi.coords.longitude,
      imagens: newImgArray || [ ],
      endereco: productApi.endereco,
      valorPorPessoa: productApi.valorPorPessoa,
      cidade: cidadeProduto
       ? cidadeProduto
       : { nome: productApi.cidade, pais: "Brasil" },
      categoria: { id: productApi.categorySelect },
      caracteristicas: atributosEditados,
      limitePessoasPorDia: productApi.limitePessoasPorDia,
    };
  };

  const openModalWithMap = async (endereco, cidade) => {

    const { coords } = await getCoordinates(endereco, cidade)
    setProdCoords(coords)
    setShowMap(true)
    setModalStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
    setShowMap(false)//retirando o mapa do modal
  }

  function createProductToApi(product) {
    const objProd = createProduct(product)
    
    if (objProd) {
      let thumbnailIsSelected = objProd.imagens.some(img => img.ehImagemCapa)
      if(!thumbnailIsSelected) {
        Toast.fire({icon:'warning',title:'Selecione a capa principal'})
        return;
      }
      api
        .post("/produtos/salvar", objProd, {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setModalStatus(true);
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 400) {
            Toast.fire({
              icon: "warning",
              title: error.response.data.mensagem,
              showConfirmButton: true,
              timer: false,
            });
          }
          if (error.response.status === 401) {
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

  return (
    <div className="div_create">
      <div className="div_titulo_adm">
        <p className="titulo_adm">Administração</p>
      </div>

      <div>
        <p className="titulo_create">Criar Propriedade</p>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          nome: "",
          endereco: address ? address.street : "",
          cidade: address ? address.city : "",
          descricao: "",
          limitePessoasPorDia: "",
          valorPorPessoa: "",
        }}  
        onSubmit={async (values, actions) => {          
          const { coords, placeName } = await getCoordinates(
            values.endereco,
            values.cidade
          );
          createProductToApi({ ...values, endereco: placeName, coords })
          actions.resetForm
        }}
      >
        {({ values }) => {
          return (
            <Form className="create-form">
              {/* 1- NOME:   */}
              <div className="item-form">
                <label htmlFor="nome">Nome da propriedade</label>
                <Field
                  onChange={e => setNomeCamping(e.target.value)}
                  value={nomeCamping}
                  className="input"
                  type="text"
                  name="nome"
                  placeholder="Ex: Camping Chapada"
                />
              </div>
              {/* 2 - CATEGORIA - SELECT? */}
              <div className="item-form">
                <label htmlFor="category">Categoria</label>
                <Select
                  styles={style}
                  options={categorias}
                  onChange={(e) => setCategorySelect(e.id)}
                  getOptionLabel={(options) => options.nome}
                  placeholder="Escolha uma categoria"
                />
              </div>
              {/* CEP */}
              <div className="item-form">
                <label htmlFor="cep">CEP</label>
                <Field
                  onChange={(e) => setCep(e.target.value)}
                  className="input"
                  type="text"
                  name="cep"
                  placeholder=" Ex: 42700000"
                />
                <button
                  onClick={getCepFromApi}
                  type="button"
                  className="btn-search"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              {/* 4 - ENDEREÇO: PRECISA ENVIAR END E ENVIAR TBM LATITUDE E LONG */}
              <div className="item-form">
                <label htmlFor="endereco">Endereço</label>
                <Field
                  disabled={!cep || address?.street ? true : false}
                  className="input"
                  type="text"
                  name="endereco"
                />
                <button
                  disabled={cep || address?.street ? false : true}
                  onClick={() => openModalWithMap(values.endereco, values.cidade)}
                  type="button"
                  className="btn-map"
                >
                  Ver no mapa <FontAwesomeIcon icon={faMapLocationDot} />
                </button>
              </div>
              {/* 5 - CIDADE > SELECT DA CIDADE COM ESTADO EX: SAO PAULO-SP */}
              <div className="item-form">
                <label htmlFor="cidade">Cidade</label>
                <Field
                  disabled={true}
                  className="input"
                  type="text"
                  name="cidade"
                />
              </div>
              {/* 7 - LIMITE E VALOR PESSOAS DIA: */}
              <div className="item-form">
                <div className="div-limite">
                  <label htmlFor="limitePessoasPorDia">
                    Limite de pessoas
                  </label>
                  <Field
                    className="input"
                    type="number"
                    name="limitePessoasPorDia"
                  />
                </div>
                <div className="div-limite">
                  <label htmlFor="valorPorPessoa">
                    Valor por pessoa
                  </label>
                  <Field
                    className="input"
                    type="number"
                    name="valorPorPessoa"
                  />
                </div>
              </div>
              {/* 6 - DESCRIÇÃO :  */}
              <div className="description">
                <label htmlFor="descricao">Descrição</label>
                <Field
                  className="form-textarea input textarea"
                  as="textarea"
                  name="descricao"
                  placeholder="Descrição da Propriedade"
                />
              </div>
              {/* 8 - ATRIBUTOS - CARACTERISTICAS  - NOME: "WIFI" ICONE: "HTTP" */}
              <div className="title_attribute">
                <p>Adicionar atributos (Caracteristicas)</p>
              </div>

              <div className="item-form select-atributo">
                <label htmlFor="select-atributos">
                  Selecione as características do produto:
                </label>
                <Select
                  name="caracteristicas"
                  styles={selectStyles}
                  isMulti
                  closeMenuOnSelect={false}
                  options={editarNomeAtributo(caracteristicas)}
                  onChange={(e) => setFeatures(e)}
                  placeholder="Escolha os atributos"
                />
                <div className="select-atributo__all-features">
                  Características selecionadas:
                  {selectedFeatures.map((feature) => {
                    return (
                      <img
                        key={feature.icone}
                        src={feature.icone}
                        alt="ícone da caracteristica"
                      />
                    );
                  })}
                </div>
              </div>

              {/* 10 - IMAGEM : URL e TITULO  */}
              <div className="title_img">
                <p>Carregar Imagens</p>
              </div>
              <AddImage getImg={getImg} isRemove={false} />
              {
                img &&
                img.map((img, index) => {
                  return (
                    <AddImage
                      deleteImg={deleteImg}
                      key={img.url}
                      img={img}
                      isRemove={true}
                      getThumbnail={setThumbnail}
                    />
                  );
                })
              }

              <button type="submit" className="btn-create-prod btn-filled">
                Criar
              </button>
            </Form >
          );
        }}
      </Formik >
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}
      >
        {showMap ? <Map product={prodCoords} /> : <ModalSuccess texto={"Produto criado com sucesso!"} />}
      </Modal >
    </div >
  );
};

export default CreateForm;
