import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import crudContext from "../context/CrudApiContext";
const initailForm = {
  username: "",
  email: "",
  password: "",
};
const SigIn = () => {
  const { createUser } = useContext(crudContext);

  const [form, setForm] = useState(initailForm);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (!form.username || !form.email || !form.password) {
      alert("Datos incompletos");
      return;
    }
    createUser(form);
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form>
        <input
          type="text"
          name="username"
          id="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
        <input type="submit" value="Enviar" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default SigIn;
