import "./registerForm.sass";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput/FormInput";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
// import { api } from "../../services/apiClient";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const RegisterForm = () => {
  const [redirectLink, setRedirectLink] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  if (redirectLink) {
    return <Navigate to={redirectLink} />;
  }

  const initialValuesRegisterForm = {
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    passwordConfirmation: "",
  };

  const registerUser = (user) => {
    api
      .post("clientes/permitAll/salvar", user)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            title: "Cadastrado com sucesso! Ative sua conta pelo email.",
          });
          setTimeout(() => {
            setRedirectLink("/login");
          }, 2600);
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.status === 500) {
          Toast.fire({ icon: "warning", title: "Email em uso" });
        } else if (error.response.data.status === 400) {
          Toast.fire({
            icon: "error",
            title:
              "Infelizmente, você não pôde se registrar. Por favor, tente novamente mais tarde",
          });
        }
      });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const validationSchemaRegisterForm = Yup.object().shape({
    nome: Yup.string().required("Este campo é obrigatório"),
    sobrenome: Yup.string().required("Este campo é obrigatório"),
    email: Yup.string()
      .required("Este campo é obrigatório")
      .email(
        "Email inválido. Informe um email no formato: meuemail@dominio.com"
      ),
    senha: Yup.string()
      .required("Este campo é obrigatório")
      .min(7, "A senha deve ter mais de 6(seis) caracteres"),
    passwordConfirmation: Yup.string()
      .required("Este campo é obrigatório")
      .oneOf([Yup.ref("senha"), null], "As senhas não batem"),
  });

  return (
    <Formik
      initialValues={initialValuesRegisterForm}
      validationSchema={validationSchemaRegisterForm}
      onSubmit={(values) => {
        const { passwordConfirmation, ...newUser } =
          values; /* clonando as propriedades de values e ignorando 'passwordConfirmation'*/
        registerUser({ passwordConfirmation, ...newUser, funcao: { id: 2 } });
      }}
    >
      {({ errors }) => {
        return (
          <>
            <h1 className="form-register__title">Criar Conta</h1>
            <Form className="form-register">
              <div className="box-input__desktop">
                <FormInput
                  id="nome"
                  nameInput="nome"
                  textLabel="Nome"
                  error={errors.nome}
                />

                <FormInput
                  id="sobrenome"
                  nameInput="sobrenome"
                  textLabel="Sobrenome"
                  error={errors.sobrenome}
                />
              </div>
              <FormInput
                id="email"
                nameInput="email"
                textLabel="E-mail"
                type="email"
                error={errors.email}
              />

              <FormInput
                id="senha"
                nameInput="senha"
                textLabel="Senha"
                type={passwordShown ? "text" : "password"}
                error={errors.senha}
              >
                <span className="form-register__icon-password">
                  <FontAwesomeIcon
                    onClick={() => setPasswordShown(!passwordShown)}
                    className="eye-password"
                    icon={faEye}
                  />
                </span>
              </FormInput>

              <FormInput
                id="passwordConfirmation"
                nameInput="passwordConfirmation"
                textLabel="Confirmar senha"
                type={passwordShown ? "text" : "password"}
                error={errors.passwordConfirmation}
              />

              <button className="btn-filled" type="submit">
                Registrar
              </button>
              <span className="text-conta">
                Já tem uma conta?{" "}
                <Link className="link-reg" to="/login">
                  Iniciar sessão
                </Link>
              </span>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
