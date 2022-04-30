import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import PrivatePage from "./components/PrivatePage";
import NewTicket from "./pages/NewTicket";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

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
            <Route path="/tickets" element={<PrivatePage />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>
            <Route path="/ticket/:ticketId" element={<PrivatePage />}>
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
