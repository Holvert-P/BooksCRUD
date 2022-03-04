import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // return (
  // <>
  //   <h2>Dashboard</h2>
  //   <button
  //     onClick={() => {
  //       localStorage.removeItem("isAuth");
  //       history("/login");
  //     }}
  //   >
  //     Cerrar Sesion
  //   </button>
  // </>
  let isAuth = true;
  // let isAuth = localStorage.getItem("isAuth");
  if (!localStorage.getItem("isAuth")) return "";
  return (
    <>
      {isAuth ? (
        <>
          <h2>Bienvenido a tu Dashboard</h2>
          <button
            onClick={() => {
              // localStorage.setItem("isAuth", false);
              navigate("/login");
            }}
          >
            Cerrar session
          </button>
        </>
      ) : (
        <>
          <h2>Usuario no logueado</h2>
          <p>Necesitas iniciar sesion para poder acceder</p>
          <Link to="/login">Inicia sesion aqui</Link>
        </>
      )}
    </>
  );
  // );
};

export default Dashboard;
