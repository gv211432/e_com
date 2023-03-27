import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import config from '../../config';
import UserContext from '../../context/globalContext';
import axiosInstance from '../../helpers/axiosInstance';

const Card = ({ entry, index, extra, local }) => {
  const { productData, setProductData } = useContext(UserContext);
  const navigate = useNavigate();  // generater random number in given range

  let getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleAddToCart = async () => {
    const res = await axiosInstance.post("/api/cart/add_to_cart", {
      product_id: productData._id
    });
    if (res.status == 200) {
      toast("Added to cart");
    }
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
              : entry?.all_img_url?.length ? `${config.baseURI}:${config.port}/api/common/files/${entry?.all_img_url[0]}` :
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6at7RwZOM_yVpsUZWimO0o75bYbKAE1DaTg&usqp=CAU"
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
                handleAddToCart();
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
      <ToastContainer />
    </div>
  );
};

export default Card;
