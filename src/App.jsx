import Navbar from "./Components/Navbar";
import { CrudProvider } from "./context/CrudApiContext";
const App = () => {
  return (
    <>
      <CrudProvider>
        <Navbar />
      </CrudProvider>
    </>
  );
};

export default App;
