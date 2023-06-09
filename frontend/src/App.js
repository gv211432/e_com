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
import ShowProduct from './pages/SingleProduct/ShowProduct';
import Dashboard from './pages/Admin/components/Dashboard';
import EditProduct from './pages/Admin/components/EditProduct';
import Profile from './pages/Profile/Profile';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

  const checkLogin = async () => {
    const res = await axiosInstance.post("/api/user");
    if (res.status == 200) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // this is used for handlin the routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {isLoggedIn ? <Home /> : <Login />}
        </>
      ),
    },
    {
      path: "/products",
      element: <>
        {
          isLoggedIn ?
            <Products />
            : <Login />
        }
      </>
    },
    {
      path: "/cart",
      element: <>
        {
          isLoggedIn ?
            <Cart />
            : <Login />
        }
      </>
    },
    {
      path: "/single_product",
      element: <>
        {
          isLoggedIn ?
            <SingleProduct />
            : <Login />
        }
      </>
    },
    {
      path: "/show_product",
      element: <>
        {
          isLoggedIn ?
            <ShowProduct />
            : <Login />
        }
      </>
    },
    {
      path: "/register",
      element: <>
        <Register />
      </>
    },
    {
      path: "/admin/add_products",
      element: <>
        {
          isLoggedIn ?
            <Admin />
            : <Login />
        }
      </>
    },
    {
      path: "/admin/edit_product",
      element: <>
        {
          isLoggedIn ?
            <EditProduct />
            : <Login />
        }
      </>
    },
    {
      path: "/admin/dashboard",
      element: <>
        {
          isLoggedIn ?
            <Dashboard />
            : <Login />
        }
      </>
    },
    {
      path: "/profile",
      element: <>
        {
          isLoggedIn ?
            <Profile />
            : <Login />
        }
      </>
    },
    {
      path: "*",
      element: <>
        {
          isLoggedIn ?
            <Home />
            : <Login />
        }
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
