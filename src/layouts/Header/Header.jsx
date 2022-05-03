import React, { useState, useLayoutEffect, useEffect } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu/Menu";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.sass";
import UserInfo from "./UserInfo/UserInfo";
import { useCookies } from "react-cookie";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const [menuToggle, setMenuToggle] = useState(false);
  const [adminBtnToggle, setAdminBtnToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cookies] = useCookies(["token"]);

  const menuHandler = () => {
    setMenuToggle(!menuToggle);
  };

  useEffect(() => {
    if (cookies.permissoes) {
      const role = cookies.permissoes[0];
      if (role === "ROLE_ADMIN") {
        setAdminBtnToggle((prevState) => !prevState);
      }
    }
  }, [cookies]);

  useLayoutEffect(() => {
    if (document.body.clientWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [document.body.clientWidth]);

  return (
    <>
      <header className="header">
        <Link to="/">
          <picture className="header__logo">
            <source
              media="(min-width:48em)"
              srcSet="https://pi-t2-g3.s3.amazonaws.com/icons/logo_subtitle.svg"
            />
            <img
              src="https://pi-t2-g3.s3.amazonaws.com/icons/logo.svg"
              alt="logo"
            />
          </picture>
        </Link>
        {!isMobile && cookies.token ? (
          <div className="div-user-info">
            {adminBtnToggle && pathname !== "/create" && (
              <Link to="/create">
                <button className="btn-create">
                  Criar Produto
                </button>
              </Link>
            )}
            {!adminBtnToggle && (
              <Link to="/reservas">
              <button className="btn-create">
                Minhas reservas
              </button>
            </Link>
            )}
            <UserInfo />
          </div>
        ) : (
          <div className="btn-container">
            {pathname !== "/register" && (
              <Link to="/register">
                <button className="btn-transparent">Criar conta</button>
              </Link>
            )}

            {pathname !== "/login" && (
              <Link to="/login">
                <button className="btn-transparent  ">Fazer login</button>
              </Link>
            )}
          </div>
        )}

        <FontAwesomeIcon
          onClick={menuHandler}
          icon={faBars}
          className="header__bar"
        />
      </header>

      <Menu visibility={menuToggle} closeMenu={menuHandler} />
    </>
  );
};

export default Header;
