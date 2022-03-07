import React, { useContext } from "react";
import crudContext from "../context/CrudApiContext";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const { error, loading, db } = useContext(crudContext);
  return (
    <div className="crud-api">
      {loading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status}: ${error.statusText}`}
          bgColor="#dc3545"
        />
      )}

      {db && <CrudTable />}
    </div>
  );
};

export default CrudApi;
