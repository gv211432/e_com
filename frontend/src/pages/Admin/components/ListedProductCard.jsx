import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';

const ListedProductCard = ({ entry }) => {
  const navigate = useNavigate();
  return (
    <div className="row border rounded m-2"
      style={{ verticalAlign: "middle" }}
    >
      <div className="col col-12 col-sm-12 col-md-3"
      >
        <img
          className='img-fluid'
          style={{
          }}
          src={
            entry?.all_img_url.length
              ? `${config.baseURI}:${config.port}/api/common/files/${entry?.all_img_url[0]}`
              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6at7RwZOM_yVpsUZWimO0o75bYbKAE1DaTg&usqp=CAU`
          }
        />
      </div>
      <div className="col">
        <div className="col"
          style={{ textAlign: "end" }}
        >
          <FontAwesomeIcon
            height={35}
            width={35}
            style={{ cursor: "pointer" }}
            icon="fa-solid fa-eye"
            className='text-success mt-1 ms-3'
            onClick={(e) => {
              navigate("/show_product", { state: { data: entry } });
            }}
          />
          <FontAwesomeIcon
            height={30}
            width={30}
            style={{ cursor: "pointer" }}
            icon="fa-solid fa-edit"
            className='text-primary mt-1 ms-3'
            onClick={(e) => {
              navigate("/admin/edit_product", { state: { data: entry } });
            }}

          /><FontAwesomeIcon
            height={30}
            style={{ cursor: "pointer" }}
            width={30}
            icon="fa-solid fa-trash"
            className='text-danger mt-1 ms-3'
            onClick={(e) => {
            }}
          />
        </div>
        <div className="col">
          <h3 className="card-title" style={{ fontWeight: 700 }}>
            {entry?.name}
            {entry?.is_varified
              ? <sup><i className="ps-1 text-success fa-solid fa-circle-check" />
                <span style={{ fontSize: '0.6rem' }}>
                  varified
                </span>
              </sup>
              : ""}
          </h3>
        </div>
        <div className="col border rounded p-2">
          {entry?.description}
        </div>
        <div className="col">
          <span style={{ fontSize: "30px" }} className='border rounded'>₹{entry?.price?.toString() || 500}
            <sup style={{ textDecoration: 'line-through', color: 'red' }}>
              ₹{entry?.mrp?.toString() || 1000}
            </sup>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListedProductCard;
