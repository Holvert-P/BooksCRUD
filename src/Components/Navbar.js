import React, { useContext, useEffect } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import crudContext from "../context/CrudApiContext";
import AddNew from "../pages/AddNew";
import Error404 from "../pages/Error404";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import SigIn from "../pages/SigIn";
import Usuario from "../pages/Usuario";
import ButtonLogout from "./ButtonLogout";

const Navbar = () => {
  const { setDataToEdit, isAuth, setIsAuth } = useContext(crudContext);

  document.addEventListener("click", (e) => {
    if (e.target.id === "navbarBtn") {
      document.querySelector(".navbar-container").classList.add("isVisible");
    } else {
      document.querySelector(".navbar-container").classList.remove("isVisible");
    }
  });
  let auth = localStorage.getItem("isAuth");
  useEffect(() => {
    if (auth) {
      setIsAuth(true);
    }
  }, [auth, setIsAuth]);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <span className="logo">
          <Link to="/">Library</Link>
        </span>
        <span className="btn-navbar" id="navbarBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </span>
        <div className="navbar-container">
          <ul className="list list-menu">
            <li className="listItem">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Libros
              </NavLink>
            </li>
            {isAuth && (
              <li className="listItem">
                <NavLink
                  to="/add"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setDataToEdit(null);
                  }}
                >
                  Agregar
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="list">
            {!isAuth && (
              <li className="listItem">
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Registrarse
                </NavLink>
              </li>
            )}
            {isAuth && (
              <>
                <li className="listItem">
                  <NavLink
                    to="/me"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Holvert Perez
                  </NavLink>
                </li>
                <ButtonLogout />
              </>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        {isAuth && (
          <>
            <Route path="/add" element={<AddNew />} />
            <Route path="/me" element={<Usuario />} />
            <Route path="/edit/:id" element={<AddNew />} />
          </>
        )}
        <Route path="/signup" element={<SigIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
