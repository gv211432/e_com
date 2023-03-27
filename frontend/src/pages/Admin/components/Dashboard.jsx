import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../../components/Navbar/Navbar';
import axiosInstance from '../../../helpers/axiosInstance';
import ListedProductCard from './ListedProductCard';

const Dashboard = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = async () => {
    const res = await axiosInstance.post("/api/product/user_products");
    if (res.status == 200) {
      console.log(res.data?.data);
      setFetchedData(res?.data?.data);
    }
  };

  const updateList = () => {
    fetchData();
    toast("Deleted one product");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (<>
    <Navbar />
    <div className='container'>
      {fetchedData?.map(data => <ListedProductCard entry={data} updateList={updateList} />)}
    </div>
    <ToastContainer />
  </>
  );
};

export default Dashboard;
