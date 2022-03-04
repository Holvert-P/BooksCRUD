import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initailForm = {
  title: "",
  auth: "",
  edition: "",
  id: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initailForm),
    navigate = useNavigate();

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initailForm);
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

    if (form.id === null) {
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
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
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
    </div>
  );
};

export default CrudForm;
