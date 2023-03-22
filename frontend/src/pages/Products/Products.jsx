import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Carousel/Card';
import InvisibleCard from '../../components/Carousel/InvisibleCard';
import Navbar from '../../components/Navbar/Navbar';
import axiosInstance from '../../helpers/axiosInstance';
import "./Products.css";

const Products = () => {
  const params = useParams();
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = async () => {
    const res = await axiosInstance.get("/api/products");
    if (res.status == 200) {
      setFetchedData(res?.data?.data);
      // alert(JSON.stringify(res?.data?.data));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className='row p-2 mx-auto'>
        {fetchedData?.map((data, i) => {
          return (<div className="col">
            <Card entry={data}
              index={i} key={i}
              extra={fetchedData}
            />
          </div>);
        })}
        {fetchedData?.length % 3 == 2 ?
          <InvisibleCard entry={null} index={0} key={0} />
          : <>
            <InvisibleCard entry={null} index={0} key={0} />
            <InvisibleCard entry={null} index={0} key={0} />
          </>}
      </div>
    </>
  );
};

export default Products;
