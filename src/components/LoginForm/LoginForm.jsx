import "./loginform.sass";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useUser } from '../../hooks/useUser';

/* Validações nas entradas: O formulário deve validar que o campo de email é um email válido e que a senha tem mais de 6 caracteres. */
const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(7, "A senha tem que ter mais que 6 caracteres!")
    .max(10, "Muito grande")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const LoginForm = () => {
  const { login } = useUser();
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <>
      <h1 className="title-login">Iniciar sessão</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          login({ email: values.email, senha: values.password });
        }}
      >
        {({ }) => {
          return (
            <Form className="form-login">
              <div className="item-form">
                <label htmlFor="email">E-mail</label>
                <Field className="input" type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="item-form">
                <label htmlFor="password">Senha</label>
                <Field
                  className="input password"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                />
                <FontAwesomeIcon
                  className="eye-password"
                  onClick={() => setPasswordShown(!passwordShown)}
                  icon={faEye}
                />

                <ErrorMessage name="password" component="div" />
              </div>

              <button className="btn-filled" type="submit">
                Entrar
              </button>
              <span className="text-conta">
                Ainda não tem conta?{" "}
                <Link className="link-reg" to="/register">
                  Registre-se
                </Link>
              </span>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;