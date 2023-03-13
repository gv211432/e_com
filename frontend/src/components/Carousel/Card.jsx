import React from 'react';

const Card = ({ entry, index }) => {

  // generater random number in given range
  let getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  let max_price = 0;
  let sell_price = entry.price
    ? parseInt(entry.price)
    : getRndInteger(1000, 2000);

  if (entry.price) {
    max_price =
      Math.trunc(Math.random() * parseInt(entry.price)) + parseInt(entry.price);
  } else {
    max_price = getRndInteger(2000, 3000);
  }

  return (
    <div className='col'>
      <div className="card the-cards"
        style={{ width: "400px", height: "800px", margin: "10px 0" }}
      >

        <div style={{ width: '100%', height: '470px' }}>
          <img src={entry.img_url}
            alt={entry.name}
            width="100%"
            height={"100%"}
            className="img-fluid"
            style={{
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              objectFit: "fill"
            }} />
        </div>
        <div className="card-body">
          <center>
            <h5 className="card-title" style={{ fontWeight: 700 }}>
              {entry.name}
              {Math.random() > 0.3
                ? <sup><i className="ps-1 text-success fa-solid fa-circle-check" />
                  <span style={{ fontSize: '0.6rem' }}>
                    varified
                  </span>
                </sup>
                : ""}
            </h5>
            <h4>₹{sell_price.toString()}
              <sup style={{ textDecoration: 'line-through', color: 'red' }}>
                ₹{max_price.toString()}
              </sup>
            </h4>
            <h6 style={{ color: 'rgba(0,0,0,0.4)' }}>
              Item in stock:
              <span style={{ color: 'green' }}>
                {Math.trunc(Math.random() * 100)}
              </span></h6>
            <p className="card-text">
              Some quick example text to build on the card title and
              make up the bulk of the card's content.
            </p>
            <button className="btn btn-warning">
              Add to cart
              <i className="fa-solid fa-cart-shopping text-light"
                style={{
                  fontSize: '1.5rem', marginLeft: '0.1rem',
                  verticalAlign: 'middle'
                }} />
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Card;
