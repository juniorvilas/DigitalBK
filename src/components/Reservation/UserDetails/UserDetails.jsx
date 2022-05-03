import "./userDetails.sass";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../../hooks/useUser";
import React from 'react';

const BookingForm = () => {
  const { user } = useUser();
  
  return (
    <>
      <h4 className="booking-form-title">Complete seus Dados</h4>
        <Formik
          initialValues={{
            name: user.nome,
            lastName: user.sobrenome,
            email: user.email,
            city: "",
          }}
          enableReinitialize
        >
          {({}) => {
            return (
              <Form className="booking-form">
                <div className="item-form">
                  <label htmlFor="name">Nome</label>
                  <Field
                    className="input"
                    type="text"
                    disabled="disabled"
                    name="name"
                  />
                </div>
                <div className="item-form">
                  <label htmlFor="lastName">Sobrenome</label>
                  <Field
                    className="input"
                    type="text"
                    disabled="disabled"
                    name="lastName"
                  />
                </div>
                <div className="item-form">
                  <label htmlFor="email">E-mail</label>
                  <Field
                    className="input"
                    type="email"
                    disabled="disabled"
                    name="email"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="item-form">
                  <label htmlFor="city">Cidade</label>
                  <Field className="input" type="text" name="city" />
                </div>
              </Form>
            );
          }}
        </Formik>
    </>
  );
};

export default BookingForm;
