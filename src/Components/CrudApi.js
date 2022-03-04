import React, { useEffect, useState } from "react";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "../pages/Error404";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "https://apilibraries.herokuapp.com/api";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.error) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res.error);
        }
        setLoading(false);
      });
  }, [url]);

  const createData = (data) => {
    setLoading(true);

    data.id = Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.error) {
        setDb([...db, res]);
        setLoading(false);
      } else {
        setError(res.error);
        setLoading(false);
      }
    });
  };

  const updateData = (data) => {
    setLoading(true);
    let endpoint = `${url}/${data._id}`;
    //console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.error) {
        let newData = db.map((el) => (el._id === res._id ? res : el));
        setDb(newData);
        setLoading(false);
        console.log(res);
      } else {
        setError(res.error);
        setLoading(false);
        console.log(error);
      }
    });
  };

  const deleteData = (id, title) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el libro '${title}'?`
    );

    if (isDelete) {
      setLoading(true);
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.error) {
          let newData = db.filter((el) => el._id !== id);
          setDb(newData);
          setLoading(false);
        } else {
          setLoading(false);
          setError(res.error);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div className="crud-api">
      <HashRouter>
        <header>
          <h1>API de libreria con React JS</h1>
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Libros
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Agregar
            </NavLink>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <article>
                  {loading && <Loader />}
                  {error && (
                    <Message
                      msg={`Error ${error.status}: ${error.statusText}`}
                      bgColor="#dc3545"
                      setError={setError}
                    />
                  )}
                  {db && (
                    <CrudTable
                      data={db}
                      setDataToEdit={setDataToEdit}
                      deleteData={deleteData}
                    />
                  )}
                </article>
              </>
            }
          />
          <Route
            path="/add"
            element={
              <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default CrudApi;
