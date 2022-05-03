import "./deletarProduto.sass";
import React, { useState } from "react";
import api from '../../services/api';
import{ useCookies} from 'react-cookie';
import Swal from "sweetalert2/dist/sweetalert2.js";

const InputDeletarProduto = () => {
  const [cookies] = useCookies(['token']);
  const [idProduct, setIdProduct] = useState();
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: true,
    timer: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const deleteProduct = (id) => {
    if(!id) return;

    api.delete(`/produtos/deletar/${id}`,
    {
        headers: {
            Authorization: "Bearer " + cookies.token
        }
    })
    .then(res => {
        if(res.status === 200) {
            Toast.fire({ icon: "success", title: "Produto deletado!" });
        }
    })
    .catch(err => {
        if(err.response.status === 404) {
            Toast.fire({ icon: "error", title: err.response.data.mensagem });
        }
        if(err.response.status === 401) {
            Toast.fire({ icon: "error", title: err.response.data.mensagem });
        }
        if(err.response.status === 403) {
            Toast.fire({ icon: "error", title: err.response.data.mensagem });
        }
        if(err.response.status === 500) {
            Toast.fire({ icon: "error", title: err.response.data.mensagem });
        }
    });
  }
  
  return (
    <div className="delete-container">
    <h1>Delete um produto</h1>
      <input
        type="text"
        onChange={(e) => setIdProduct(e.target.value)}
        placeholder="Digite o ID do produto"
        value={idProduct || ""}
      />
      <button onClick={() => deleteProduct(idProduct)}>Deletar produto</button>
    </div>
  );
};

export default InputDeletarProduto;
