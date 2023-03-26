import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../../helpers/axiosInstance';
import ListedProductCard from './ListedProductCard';

const Dashboard = () => {
  const [entry, setEntry] = useState({
    name: "Profil pic",
    is_varified: true
  });
  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = async () => {
    const res = await axiosInstance.post("/api/product/user_products");
    if (res.status == 200) {
      console.log(res.data?.data);
      setFetchedData(res?.data?.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='container'>
      {fetchedData?.map(data => <ListedProductCard entry={data} />)}
    </div>
  );
};

export default Dashboard;
