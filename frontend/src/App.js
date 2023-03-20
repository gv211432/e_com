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
  const [productId, setProductId] = useState(null);
  const [imgFiles, setImgFiles] = useState([]);
  const [productData, setProductData] = useState({
    product_id: "",
    name: "",
    sub_description: "",
    description: "",
    tags: "",
    rating: "",
    price: "",
    mrp: "",
    is_varified: true,
    all_img_url: [],
    img_url: "",
    company_name: "",
    in_stock_count: "",
    category: "General",
  });


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
        <SingleProduct />
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
      isLoggedIn, setIsLoggedIn,
      productId, setProductId,
      productData, setProductData,
      imgFiles, setImgFiles
    }}>
      <div
        style={{
          width: "100%",
          overflow: "hidden"
        }}>
        <RouterProvider router={router} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
