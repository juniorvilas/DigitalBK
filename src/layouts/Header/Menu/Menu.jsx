import "./menu.sass";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import UserInfo from "../UserInfo/UserInfo";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const Menu = (props) => {
  const { user, logout } = useUser();
  const location = useLocation();
  const { pathname } = location;
  const [cookies] = useCookies(["token"]);
  const [adminBtnToggle, setAdminBtnToggle] = useState(false);
  
  var visibility = "hide";
  if (props.visibility) {
    visibility = "show";
  }

  useEffect(() => {
    if (cookies.permissoes) {
      const role = cookies.permissoes[0];
      if (role === "ROLE_ADMIN") {
        setAdminBtnToggle((prevState) => !prevState);
      }
    }
  }, [cookies]);

  return (
    <div className={`menu ${visibility}`}>
      <button className="menu__close" onClick={props.closeMenu}>
        X
      </button>
      <div className="menu__div">
        {cookies.token ? (
          <UserInfo />
        ) : (
          <span className="menu__span">menu</span>
        )}
      </div>
      {pathname !== "/register" && !cookies.token && (
        <button className="menu__create-account">
          <Link to="/register"> Criar conta </Link>
        </button>
      )}
      {pathname !== "/login" && !cookies.token && (
        <button className="menu__login">
          <Link to="/login"> Fazer login </Link>
        </button>
      )}
      {pathname !== "/create" && adminBtnToggle && (
        <button className="menu__create">
          <Link to="/create">Criar Produto</Link>
        </button>
      )}
      {pathname !== "/reservas" && cookies.token && !adminBtnToggle && (
        <button className="menu__create">
          <Link to="/reservas">Minhas reservas</Link>
        </button>
      )}
      {cookies.token && (
        <p className="menu__logout">
          Deseja{" "}
          <Link onClick={logout} to="/">
            encerrar a sessão
          </Link>
          ?
        </p>
      )}
      <div className={`menu__social ${!user.logado && "margin-top"}`}>
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faLinkedin} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </div>
  );
};

Menu.propTypes = {
  visibility: PropTypes.bool,
  closeMenu: PropTypes.func,
};

export default Menu;
