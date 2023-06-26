import React from "react";

const Input = (props) => {
  const {label, name, onChange, error, type} = props
  const className = error ? ("form-control is-invalid") : ("form-control")
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input className={className} name={name} onChange={onChange} type={type}></input>
      <div className="invalid-feedback">
        {error}
      </div>
    </div>
  )
}

export default Input;