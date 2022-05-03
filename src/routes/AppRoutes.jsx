import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error404 from "../components/Error404/Error404";
import Booking from "../pages/Booking";
import Product from "../pages/Product";
import ProtectedRoute from "./ProtectedRoute";
import CreateProd from "../pages/CreateProd"
import DeletarProduto from '../pages/DeletarProduto';
import Reservations from '../pages/Reservations';

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/product/:id" element={<Product />} />
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/create" 
            element={
            <ProtectedRoute>  
              <CreateProd />
            </ProtectedRoute>            
            } />

          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/deletarProd" element={<DeletarProduto />} />
          <Route
            path="/reserva/:id"
            element={
              <ProtectedRoute redirectPath="/login">
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservas"
            element={
              <ProtectedRoute redirectPath="/login">
                <Reservations />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
