import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import PrivatePage from "./components/PrivatePage";
import NewTicket from "./pages/NewTicket";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ticket/new" element={<PrivatePage />}>
              <Route path="/ticket/new" element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </Router>
       <ToastContainer />
    </>
  );
};

export default App;
