import React from "react";

const Message = ({ msg, bgColor, setError }) => {
  let styles = {
    padding: "2rem  4rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
    position: "fixed",
    top: "50%",
    // botton: 0,
    left: "50%",
    // right: 0,
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
