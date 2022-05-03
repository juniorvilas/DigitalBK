import './formInput.sass'
import React from 'react'
import PropTypes from 'prop-types';

import { ErrorMessage, Field } from "formik"

const FormInput = (props) => {

    return (
        <div className="form-input__box-input">
            <label htmlFor={props.nameInput}>{props.textLabel}</label>
            <Field id={props.id} className={props.error ? "input-error input" : "input"} type={props.type || 'text'} name={props.nameInput} />
            <ErrorMessage className="error-message" name={props.nameInput} component="div" />
            {(props.children && props.children)} {/* para adição de um componente filho se for preciso */}
        </div>
    )
}

FormInput.propTypes = {
    id: PropTypes.string,
    nameInput: PropTypes.string,
    textLabel: PropTypes.string,
    error: PropTypes.string
}

export default FormInput
