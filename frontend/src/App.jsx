import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Dashboard from "./pages/users/dashboard";
import Home from "./pages/posts/Home";
import Create from "./pages/posts/Create";
import Update from "./pages/posts/Update";
import AuthRoutes from "./Routes/AuthRoutes";
import GuestRoutes from "./Routes/GuestRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<AuthRoutes />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="create" element={<Create />} />
            <Route path="update" element={<Update />} />
          </Route>

          <Route element={<GuestRoutes />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="Register" element={<Register />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
