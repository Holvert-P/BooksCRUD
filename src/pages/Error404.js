import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <main className="Error">
      <h1 className="error-text">Not Found</h1>
      <span className="error-number">404</span>
      <Link to="/">Ir al inicio</Link>
    </main>
  );
};

export default Error404;
