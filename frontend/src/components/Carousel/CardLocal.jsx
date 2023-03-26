import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import UserContext from '../../context/globalContext';

const CardLocal = ({ entry, index, extra, local }) => {
  const { productData, setProductData } = useContext(UserContext);
  const navigate = useNavigate();  // generater random number in given range
  let getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  return (
    <div className='col'>
      <div className="card the-cards"
        style={{ width: "400px", height: "800px", margin: "10px 0" }}
      >
        <div style={{ width: '100%', height: '470px' }}>
          <img src={
            local ?
              entry?.img_url
              : `${config.baseURI}:${config.port}/api/common/files/${entry?.img_url}` 
          }
            alt={entry?.name}
            width="100%"
            height={"100%"}
            className="img-fluid"
            style={{
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              objectFit: "fill"
            }}
            onClick={() => {
              // alert("Hello");
              navigate("/show_product", { state: { data: entry, extra: extra, index } });
              setProductData(entry);
            }}
          />
        </div>
        <div className="card-body">
          <center>
            <h5 className="card-title" style={{ fontWeight: 700 }}>
              {entry?.name}
              {entry?.is_varified
                ? <sup><i className="ps-1 text-success fa-solid fa-circle-check" />
                  <span style={{ fontSize: '0.6rem' }}>
                    varified
                  </span>
                </sup>
                : ""}
            </h5>
            <h4>₹{entry?.price?.toString() || 500}
              <sup style={{ textDecoration: 'line-through', color: 'red' }}>
                ₹{entry?.mrp?.toString() || 1000}
              </sup>
            </h4>
            <h6 style={{ color: 'rgba(0,0,0,0.4)' }}>
              Item in stock:
              <span style={{ color: 'green' }}>
                {entry?.in_stock_count || 0}
              </span></h6>
            <p className="card-text">
              {entry?.sub_description || "Your short description go here. It describes the product briefly."}
            </p>
            <button className="btn btn-warning"
              onClick={() => {
                alert("Add to cart");
              }}
            >
              <FontAwesomeIcon
                height={38}
                width={38}
                icon="fa-solid fa-cart-shopping"
                className='text-light me-1 '
              />
              Add to cart
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default CardLocal;
