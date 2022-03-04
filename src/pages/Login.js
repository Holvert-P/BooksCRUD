import React from "react";
import { useNavigate } from "react-router-dom";

const Login = (isAuth) => {
  let navigate = useNavigate();
  return (
    <>
      <h2>Login</h2>
      <button
        onClick={() => {
          localStorage.setItem("isAuth", true);
          navigate("/dashboard");
        }}
      >
        Iniciar Sesion
      </button>
    </>
  );
};

export default Login;
