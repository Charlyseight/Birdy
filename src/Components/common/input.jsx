import React from "react";

const Input = ({ name, label, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className="form-control"
      />
    </div>
  );
};

export default Input;
