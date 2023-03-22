import React, { useState } from 'react';
import config from '../../config';

const SecondaryProduct = ({ data, index }) => {
  const [productData, setProductData] = useState(data[index]);
  return (
    <div className="row mt-3 mb-3">
      <div className="col-12 col-sm-12 col-md-6 border p-2 ">
        <center>
          <img className='img-fluid'
            // src="https://m.media-amazon.com/images/I/31RtM9nmMxL._MCnd_AC_.jpg"
            src={`${config.baseURI}:${config.port}/api/common/files/${productData?.all_img_url[0]}`}
            alt="" />
        </center>
      </div>
      <div className="col-12 col-sm-12 col-md-6 p-3 border bg-light">
        <h4>Know more</h4>
        <h1>{productData?.name || "Dummy Name"}{productData?.is_varified ? <sup><i className="ps-1 text-success fa-solid fa-circle-check" />
          <span style={{ fontSize: '0.8rem' }}>
            varified
          </span>
        </sup> : null}
        </h1>
        {productData?.description}
        <h4>₹{productData?.price || "NA"}
          <sup style={{ textDecoration: 'line-through', color: 'red' }}>
            ₹{productData?.mrp || "NA"}
          </sup>
        </h4>
        <h4>In <span className='text-success'>Stock</span> </h4>
      </div>
    </div>);
};

export default SecondaryProduct;
