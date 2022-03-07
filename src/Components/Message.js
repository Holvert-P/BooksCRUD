import React, { useContext } from "react";
import crudContext from "../context/CrudApiContext";

const Message = ({ msg, bgColor }) => {
  const { setError } = useContext(crudContext);
  let styles = {
    padding: "2rem  4rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: ".25rem",
  };

  setTimeout(() => {
    setError(false);
  }, 2000);
  return (
    <div style={styles}>
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

export default Message;
