import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import axiosInstance from '../../helpers/axiosInstance';

const Profile = () => {
  const [userData, setUserData] = useState();

  const fetchData = async () => {
    const res = await axiosInstance.post("/api/user");
    if (res.status == 200) {
      setUserData(res.data?.data);
      // alert(JSON.stringify(res.data?.data));
    }

  };
  useEffect(() => {
    fetchData();
  }, []);

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
              {90}<NavLink style={{ fontSize: "19px", color: "blue", textDecoration: "underline" }}> Open cart</NavLink>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Profile;
