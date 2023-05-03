import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
