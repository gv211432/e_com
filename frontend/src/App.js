import react, { useEffect, useState, createContext } from 'react';
import Products from './pages/Products/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Home from './pages/Home/Home';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import axiosInstance from './helpers/axiosInstance.js';
import { toast, ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import UserContext from './context/globalContext';
import Cart from './pages/Cart/Cart';

config.autoAddCss = false;
library.add(far, fas);

function App() {
  // Main apps states
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // this is used for handlin the routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {isLoggedIn ? <Home /> : <Login />}
          {/* <SingleProduct />
          <Admin /> */}
        </>
      ),
    },
    {
      path: "/products",
      element: <>
        <Products />
      </>
    },
    {
      path: "/cart",
      element: <>
        <Cart />
      </>
    },
    {
      path: "/single_product",
      element: <>
        <Products />
      </>
    },
    {
      path: "/register",
      element: <>
        {isLoggedIn ? <Home /> : <Register />}
      </>
    },
    {
      path: "/admin/add_products",
      element: <>
        <Admin />
      </>
    },
    {
      path: "*",
      element: <>
        {isLoggedIn ? <Home /> : <Login />}
      </>,
    },
  ]);

  return (
    <UserContext.Provider value={{
      isLoggedIn, setIsLoggedIn
    }}>
      <div
        style={{
          width: "100%",
          overflow: "hidden"
        }}>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
