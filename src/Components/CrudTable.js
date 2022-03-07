import React, { useContext } from "react";
import crudContext from "../context/CrudApiContext";
import CrudTableRow from "./CrudTableRow";

const CrudTable = () => {
  const { db: data, isAuth } = useContext(crudContext);
  return (
    <div>
      <h3 className="crud-table-title">Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Edicion</th>
            {isAuth && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => <CrudTableRow key={el._id} el={el} />)
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Sin datos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
