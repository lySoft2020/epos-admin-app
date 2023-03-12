import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Activation from "./Pages/ActivationKey";
import CustomerList from "./Pages/CustomerList";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NavBar from "./Pages/Components/NavBar";
import Register from "./Pages/Register";
import authService from "./features/authService";
import Logout from "./Pages/Logout";
import PrivateRoute from "./Pages/PrivateRoute";
import CustomerDetails from "./Pages/CustomerDetails";

function App() {
  const user = authService.getCurrentUser();
  console.log(user, "/see");

  return (
    <>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/activation" element={<Activation />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/addCustomer/:shopid" element={<CustomerDetails />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
