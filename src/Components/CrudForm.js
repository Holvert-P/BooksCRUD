import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import crudContext from "../context/CrudApiContext";
const initailForm = {
  title: "",
  auth: "",
  edition: "",
  _id: null,
};

const CrudForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initailForm);
  const { createData, updateData, dataToEdit, setDataToEdit } =
    useContext(crudContext);
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initailForm);
      navigate("/add");
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.auth || !form.edition) {
      alert("Datos incompletos");
      return;
    }

    if (form._id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initailForm);
    setDataToEdit(null);
    navigate("/");
  };

  return (
    <section className="crud-form">
      <h3 className="crud-table-title ">
        {dataToEdit ? "Editar libro" : "Agregar nuevo libro"}
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titulo"
          onChange={handleChange}
          value={form.title}
        />
        <input
          type="text"
          name="auth"
          placeholder="Autor"
          onChange={handleChange}
          value={form.auth}
        />
        <input
          type="text"
          name="edition"
          placeholder="Edicion"
          onChange={handleChange}
          value={form.edition}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </section>
  );
};

export default CrudForm;
