import React from 'react';

const SecondaryProduct = () => {
  return (
    <div className="row mt-3 mb-3">
      <div className="col-12 col-sm-12 col-md-6 border p-2 ">
        <center>
          <img src="https://m.media-amazon.com/images/I/31RtM9nmMxL._MCnd_AC_.jpg" alt="" />
        </center>
      </div>
      <div className="col-12 col-sm-12 col-md-6 p-3 border bg-light">
        <h4>Know more</h4>
        <h1>Insta Pixel Shot</h1>

        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo animi, architecto recusandae
        tempora culpa quos eligendi assumenda facere omnis exercitationem neque, accusantium vero. Veniam nihil labore iure itaque similique deserunt!

        <h4 className='pt-2'>₹{5000}
          <sup style={{ textDecoration: 'line-through', color: 'red' }}>
            ₹{8000}
          </sup>
        </h4>
        <h4>In <span className='text-success'>Stock</span> </h4>
      </div>
    </div>);
};

export default SecondaryProduct;
