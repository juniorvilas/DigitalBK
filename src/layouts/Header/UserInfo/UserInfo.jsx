import "./userinfo.sass";
import React from "react";
import { useUser } from "../../../hooks/useUser";
import { useCookies } from "react-cookie";

const UserInfo = () => {
  const { user, logout } = useUser();
  const [cookies] = useCookies([]);
  return (
    <div className="user-info">
      {cookies.permissoes && cookies.permissoes[0] == "ROLE_ADMIN" && (
        <span className="adm"> Administrador</span>
      )}
      <div className="user-info__img">
        {user.nome.slice(0, 1, 1)}
        {user.sobrenome.slice(0, 1, 1)}
      </div>
      <div className="user-info__name">
        <span className="user-info__greetings">Olá,</span>
        {user.nome.slice(0, 1, 1).toUpperCase()}
        {user.nome.slice(1, user.nome.length)}{" "}
        {user.sobrenome.slice(0, 1, 1).toUpperCase()}
        {user.sobrenome.slice(1, user.sobrenome.length)}
      </div>
      <div className="user-info__logout" onClick={logout}>
        X
      </div>
    </div>
  );
};

export default UserInfo;
