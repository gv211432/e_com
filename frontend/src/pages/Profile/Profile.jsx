import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import UserContext from '../../context/globalContext';
import axiosInstance from '../../helpers/axiosInstance';

const Profile = () => {
  const [userData, setUserData] = useState();
  const { isLoggeIn, setIsLoggedIn } = useContext(UserContext);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axiosInstance.post("/api/user");
    if (res.status == 200) {
      setUserData(res.data?.data);
      // alert(JSON.stringify(res.data?.data));
    }
    const res2 = await axiosInstance.post("/api/cart/count");
    if (res2.status == 200) {
      setCartCount(res2?.data?.products_count);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    const res = axiosInstance.post("/api/auth/logout");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (<>
    <Navbar />
    <div className='container'>
      <div className="row mt-2">
        <div className="row border rounded mt-2">
          <div className="col mt-2 ">
            <h2 className='border p-2 rounded'>
              <span className='text-muted ' style={{ fontSize: "29px", fontWeight: 700 }}>Name: </span>
              {userData?.name}
            </h2>
            <h2 className='border p-2 rounded'>
              <span className='text-muted' style={{ fontSize: "29px", fontWeight: 700 }}>Email: </span>
              {userData?.email}
            </h2>
            <h2 className='border p-2 rounded'>
              <span className='text-muted' style={{ fontSize: "29px", fontWeight: 700 }}>Adderess: </span>
              {userData?.address}
            </h2>
            <h2 className='border p-2 rounded'>
              <span className='text-muted' style={{ fontSize: "29px", fontWeight: 700 }}>Total Orders: </span>
              {cartCount}<NavLink style={{ fontSize: "19px", color: "blue", textDecoration: "underline" }}> Open cart</NavLink>
            </h2>
            <center className='border mb-2 p-2 rounded'>
              <button className='btn btn-success m-3'
                onClick={async () => {
                  navigate("/admin/add_products");
                }}
              >
                Sell your product
              </button>
              <button className='btn btn-primary m-3'
                onClick={async () => {
                  navigate("/admin/dashboard");
                }}
              >
                Dashboard
              </button>
              <button className='btn btn-danger'
                onClick={handleLogout}
              >
                Logout
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Profile;
