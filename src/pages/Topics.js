import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Productos from "./Productos";

const Topics = () => {
  return (
    <>
      <h2>Temas de React</h2>
      <ul>
        <li>
          <Link to="jsx">JSX</Link>
        </li>
        <li>
          <Link to="props">Props</Link>
        </li>
        <li>
          <Link to="estado">Estado</Link>
        </li>
        <li>
          <Link to="producto">Producto</Link>
        </li>
      </ul>

      <Routes>
        <Route path="producto" element={<Productos />} />
      </Routes>
    </>
  );
};

export default Topics;
