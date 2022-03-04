import { useNavigate, useLocation } from "react-router-dom";

const Productos = () => {
  let { search } = useLocation();

  let query = new URLSearchParams(search);

  const LIMIT = 20;
  let start = parseInt(query.get("inicio")) || 1;
  let end = parseInt(query.get("end")) || LIMIT;

  let history = useNavigate();
  const handlePrev = (e) => {
    history({ search: `?inicio=${start - LIMIT}&end=${end - LIMIT}` });
  };
  const handleNext = (e) => {
    history({ search: `?inicio=${start + LIMIT}&end=${end + LIMIT}` });
  };
  return (
    <div>
      <h2>Productos</h2>
      <p>
        Mostrando productos del <b>{start}</b> al <b>{end}</b>
      </p>
      {start > LIMIT && <button onClick={handlePrev}>Atrás</button>}
      <button onClick={handleNext}>Adelante</button>
    </div>
  );
};

export default Productos;
