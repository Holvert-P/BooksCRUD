import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import crudContext from "../context/CrudApiContext";

const CrudTableRow = ({ el }) => {
  let { title, auth, _id, edition } = el;
  const { setDataToEdit, deleteData, isAuth } = useContext(crudContext);

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
      {isAuth && (
        <>
          <td>
            <button className="btn-edit" onClick={handleEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 0 24 24"
                width="16px"
                fill="#fff"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </button>
            <button
              className="btn-delete"
              onClick={() => deleteData(_id, title)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 0 24 24"
                width="16px"
                fill="#fff"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default CrudTableRow;
