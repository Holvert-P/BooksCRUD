import React from "react";
import img from "../assets/Spinner-1s-200px.svg";
const Loader = ({ title = "Cargando..." }) => {
  return (
    <div className="loader">
      <img src={img} alt="loading" />
      {title}
    </div>
  );
};

export default Loader;
