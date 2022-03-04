import React from "react";
import { useNavigate } from "react-router-dom";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { title, auth, edition, _id } = el;
  const navigate = useNavigate();
  const handleEdit = () => {
    setDataToEdit(el);
    navigate(`/edit/${_id}`);
  };

  return (
    <tr>
      <td>{title}</td>
      <td>{auth}</td>
      <td>{edition}</td>
      <td>
        <button className="btn-edit" onClick={handleEdit}>
          Editar
        </button>
        <button className="btn-delete" onClick={() => deleteData(_id, title)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
