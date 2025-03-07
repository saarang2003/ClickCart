import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/Login";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import NotFound from "./pages/not-found/notfound";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";

function App() {

const {user , isAuthenticated , isLoading} = useSelector(state => state.auth);
const dispatch = useDispatch();

useEffect(() =>{
    dispatch(checkAuth())
} , [dispatch])


if(isLoading) return <div>Loading...</div>

  return (
    <div>
      App
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
  path="/admin"
  element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AdminLayout />
    </CheckAuth>
  }
>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="features" element={<AdminFeatures />} />
</Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>

        <Route
          path="*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <NotFound />
            </CheckAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
