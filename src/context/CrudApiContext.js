import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const crudContext = createContext();
const initialAuth = {
  username: "",
  email: "",
  password: "",
};
const CrudProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(initialAuth);
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
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.error) {
        let newData = db.map((el) => (el._id === data._id ? data : el));
        setDb(newData);
        setLoading(false);
      } else {
        setError(res.error);
        setLoading(false);
      }
    });
  };

  const deleteData = (id, title) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el libro ${title}'?`
    );

    if (isDelete) {
      setLoading(true);
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.error) {
          let newData = db.filter((el) => el._id !== id);
          setDb(newData);
          setLoading(false);
        } else {
          setError(res.error);
          setLoading(false);
        }
      });
    } else {
      return;
    }
  };

  const createUser = (data) => {
    let url = "http://localhost:9000/signup";
    setLoading(true);
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.error) {
        setIsAuth(true);
        localStorage.setItem("isAuth", JSON.stringify(res));
        setLoading(false);
      } else {
        setError(res.error);
        setLoading(false);
      }
    });
  };
  let endpoint = "http://localhost:9000/me";
  const verifyUser = (endpoint) => {
    setLoading(true);
    let options = {};
    let user = JSON.parse(localStorage.getItem("isAuth"));

    if (user !== null) {
      options = {
        headers: {
          "content-type": "application/json",
          "x-access-token": user.token,
        },
      };
    } else {
      options = { headers: { "content-type": "application/json" } };
    }
    api.get(endpoint, options).then((res) => {
      console.log(res);
      if (!res.err) {
        setIsAuth(true);
        setUser(res);
        setLoading(false);
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    verifyUser(endpoint);
  }, [endpoint]);

  const data = {
    db,
    error,
    loading,
    createData,
    dataToEdit,
    setDataToEdit,
    updateData,
    deleteData,
    setError,
    createUser,
    isAuth,
    setIsAuth,
    user,
    setUser,
  };
  return <crudContext.Provider value={data}>{children}</crudContext.Provider>;
};

export { CrudProvider };
export default crudContext;
