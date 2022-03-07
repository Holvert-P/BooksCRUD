import { useContext } from "react";
import crudContext from "../context/CrudApiContext";

const Usuario = () => {
  const { user } = useContext(crudContext);
  const { email, username } = user;
  return (
    <>
      <h3>Perfil de usuario</h3>
      <p>
        Nombre del usuario
        <b>{username}</b>
      </p>
      <p>
        correo electronico
        <b>{email}</b>
      </p>
    </>
  );
};

export default Usuario;
