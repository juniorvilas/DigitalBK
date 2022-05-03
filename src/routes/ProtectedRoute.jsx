import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import React from 'react';
import { getValue } from '../utils/useSessionStorage';

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const [cookies] = useCookies(["token"]);
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  
  if (children.type.name === "Booking") {
    if (!cookies.token) {
      Toast.fire({ icon: "warning", title: "Faça login para reservar" });
      return <Navigate to={redirectPath} />;
    } else if(!getValue("product")) {
      return <Navigate to={redirectPath} />;
    }
  }

  if (children.type.name === "CreateProd") {
    if (cookies.token === undefined) {
      Toast.fire({ icon: "warning", title: "Faça login para criar um produto" });
      return <Navigate to={redirectPath} />;
    }
  }

  if (children.type.name === "Reservations") {
    if (cookies.token === undefined) {
      Toast.fire({ icon: "warning", title: "Faça login para ver suas reservas" });
      return <Navigate to={redirectPath} />;
    }
  }

  if (children.type.name === "Login") {
    if (cookies.token !== undefined) {
      return <Navigate to={redirectPath} />;
    }
  }

  return children;
};

export default ProtectedRoute;
