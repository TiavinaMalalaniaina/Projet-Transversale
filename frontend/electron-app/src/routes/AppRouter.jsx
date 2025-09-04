import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/MainLayout';
import Stocks from '../pages/Stocks';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';
import NewOrder from '../pages/NewOrder';
import AddStock from '../pages/AddStock';
import FormProduct from '../pages/FormProduct';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/add-stock" element={<AddStock />} />
          <Route path="/add-product" element={<FormProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/new-order" element={<NewOrder />} />
        </Route>
      </Routes>
    </Router>
  );
}
