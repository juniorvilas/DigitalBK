import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const UserContext = createContext(["token"]);

const UserProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  let authChannel;
  const [user, setUser] = useState({
    id: null,
    nome: "",
    sobrenome: "",
    funcao: null,
    email: "",
    permissoes: null,
  });
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

  const getUserWithToken = () => {
    api.get("usuarios/permitAll/me").then((response) => {
      const { id, nome, sobrenome, permissoes, funcao, email } = response.data;
      setUser({
        id: id,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        funcao: funcao,
        permissoes: permissoes,
      });
    });
  };

  useEffect(() => {
    if (cookies.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${cookies.token}`;
      getUserWithToken();
    }
  }, [cookies.token]);

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "logout":
          logout();
          authChannel.close();
          break;
        case "login":
          window.location.replace('http://3.95.14.243/');
          break;
        default:
          break;
      }
    }
  }, []);


  const login = async (user) => {
    try {
      let res = await api.post("/login", user);
      const { token, refresh_token, permissoes } = res.data;
      setCookie("token", token, { path: "/" });
      setCookie("refresh_token", refresh_token, { path: "/" });
      setCookie("permissoes", permissoes, { path: "/" });
      authChannel.postMessage("login");
    } catch (error) {
      if (error.response.status === 401) {
        Toast.fire({ icon: "warning", title: error.response.data.mensagem });
      }
    }
  };

  const logout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("refresh_token", { path: "/" });
    removeCookie("permissoes", { path: "/" });
    authChannel.postMessage("logout");
    window.location.replace('http://3.95.14.243/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
