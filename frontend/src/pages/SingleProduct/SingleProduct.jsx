import React, { useContext, useEffect, useState } from 'react';
import "./SingleProduct.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SecondaryProduct from './SecondaryProduct';
import UserContext from '../../context/globalContext';
import Navbar from '../../components/Navbar/Navbar';

// this the star component
const Star = ({ i, stars, setStars }) => {
  const [selected, setSeletected] = useState(stars[i]);
  return <>
    <FontAwesomeIcon
      rest
      style={{ cursor: "pointer" }}
      icon={selected ? `fa-solid fa-star` : "fa-regular fa-star"}
      // className='text-light'
      height={25}
      width={25}
      onClick={() => {
        if (!selected && i && stars[i - 1]) {
          let arr = [];
          let a = 0;
          while (a < i + 1) { arr.push(1); a++; }
          while (a < 6) { arr.push(0); a++; }
          setStars(arr);
          setSeletected(true);
        }
        if (selected && i && !stars[i + 1]) {
          let arr = [];
          let a = 0;
          while (a < i - 1) { arr.push(1); a++; }
          while (a < 6) { arr.push(0); a++; }
          setStars(arr);
          setSeletected(false);
        }
      }}
    />
  </>;
};

// const SingleProduct = () => {
//   const [stars, setStars] = useState([1, 1, 1, 1, 0, 0]);
//   const { productData } = useContext(UserContext);
//   useEffect(() => {
//     alert(JSON.stringify(productData));
//   }, []);
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-12 col-sm-12 col-md-6 col-lg-6">

//           <div className="row mb-3" style={{ maxHeight: "30rem" }}>
//             <div className="col-2 m-0 p-0 d-none d-sm-none d-md-block"
//               style={{ maxHeight: "35rem", overflow: "scroll" }}
//             >
//               <br />
//               <img className='img-fluid mb-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid mb-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid mb-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid mb-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid mb-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid mb-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid mb-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//             </div>
//             <center className="col-12 col-sm-10 bg-light p-1">
//               <img className='img-fluid' style={{
//                 borderRadius: "0.5rem", maxHeight: "30rem"
//               }}
//                 src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg"
//                 alt="" srcset="" />
//             </center>
//           </div>
//           <div className="row d-sm-block d-md-none p-1 ps-0">
//             <div className="col d-flex"
//               style={{ height: "4rem", overflow: "scroll" }}
//             >
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//               <img className='img-fluid me-1 mt-1' style={{ borderRadius: "0.3rem" }} src="https://m.media-amazon.com/images/I/61RuZvNI7NL._SX679_.jpg" alt="" srcset="" />
//             </div>
//           </div>
//         </div>

//         <div className="col"
//         >
//           <div className="row">
//             <div className="col-12 col-sm-12 col-md-12 col-lg-6 border mb-1"
//               style={{ borderRadius: "0.5rem" }}
//             >
//               <h1>Water camera<sup><i className="ps-1 text-success fa-solid fa-circle-check" />
//                 <span style={{ fontSize: '0.6rem' }}>
//                   varified
//                 </span>
//               </sup></h1>
//               <p className='text-danger mb-n1 pb-1'>Today's Deal</p>
//               <h4>₹{5000}
//                 <sup style={{ textDecoration: 'line-through', color: 'red' }}>
//                   ₹{8000}
//                 </sup>
//               </h4>
//               {stars?.map((d, i) => !i ? null : <Star i={i} setStars={setStars} stars={stars} className="text-danger" />)}

//               <h6 style={{ color: 'rgba(0,0,0,0.4)' }}>
//                 Item in stock:
//                 <span style={{ color: 'green' }}>
//                   {Math.trunc(Math.random() * 100)}
//                 </span></h6>
//               <p className="card-text">
//                 Some quick example text to build on the card title and
//                 make up the bulk of the card's content.
//               </p>
//               <h2>Description</h2>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aperiam tempore pariatur deleniti hic repellat harum doloribus quasi neque excepturi, non deserunt id natus consequatur libero nihil quisquam rem quas.
//             </div>

//             {/* this is the fourth column for payment and emi options */}
//             <div className="col-12 col-sm-12 border col-lg-6 bg-light mb-1"
//               style={{ borderRadius: "0.5rem" }}
//             >
//               <br />
//               <h4>₹{5000}
//                 <sup style={{ textDecoration: 'line-through', color: 'red' }}>
//                   ₹{8000}
//                 </sup>
//               </h4>
//               <h5> FREE delivery Saturday, 11 March. Details </h5>
//               <h6>Or fastest delivery Tomorrow, March 10.
//                 <br /> Order within 6 hrs 20 mins. Details</h6>
//               <h4>In <span className='text-success'>Stock</span> </h4>

//               <h5>Sold by Appario Retail Private Ltd and Fulfilled by EShop.</h5>

//               <center style={{ width: "100%" }}>
//                 <button className="btn btn-warning mx-auto mb-2" style={{ width: "100%" }}>
//                   <FontAwesomeIcon
//                     style={{ cursor: "pointer" }}
//                     icon={`fa-solid fa-cart-shopping`}
//                     className='text-light'
//                     height={25}
//                     width={25}
//                   />
//                   {" "}Add to cart
//                 </button>
//                 <button className="btn btn-warning" style={{ width: "100%" }}>
//                   <FontAwesomeIcon
//                     style={{ cursor: "pointer" }}
//                     icon={`fa-solid fa-truck`}
//                     className='text-light'
//                     height={25}
//                     width={25}
//                   />
//                   {" "}Buy Now
//                 </button>
//               </center>
//               <h6 style={{ textDecoration: "underline", cursor: "pointer" }}
//                 className="mt-1"
//               >More EMI options</h6>
//             </div>
//           </div>
//         </div>
//       </div>
//       <SecondaryProduct />
//     </div>
//   );
// };

const SingleProduct = () => {
  const [stars, setStars] = useState([1, 1, 1, 1, 0, 0]);
  const { productData, setProductData } = useContext(UserContext);
  useEffect(() => {
    // alert(JSON.stringify(productData));
    const pd = sessionStorage.setItem("product_info", JSON.stringify(productData));
    if (pd) setProductData(JSON.parse(pd));
    return () => sessionStorage.setItem("product_info", JSON.stringify(productData));
  }, []);

  return (<>
    <Navbar />
    <br />
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">

          {/* all image handlings */}
          <div className="row mb-3" style={{ maxHeight: "30rem" }}>
            <div className="col-2 m-0 p-0 d-none d-sm-none d-md-block"
              style={{ maxHeight: "35rem", overflow: "scroll" }}
            >
              <br />
              {productData?.all_img_url?.map(url => (<img className='img-fluid mb-1'
                src={url} style={{ borderRadius: "0.3rem" }}
                onClick={e => setProductData(p => ({ ...p, img_url: url }))}
              />)
              )}
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <center className="col-12 col-sm-10 bg-light p-1">
              <img className='img-fluid' style={{
                borderRadius: "0.5rem", maxHeight: "30rem"
              }}
                src={productData?.img_url}
                alt="" srcset="" />
            </center>
          </div>
          <div className="row d-sm-block d-md-none p-1 ps-0">
            <div className="col d-flex"
              style={{ height: "4rem", overflow: "scroll" }}
            >
              {productData?.all_img_url?.map(url => (<img className='img-fluid mb-1'
                src={url} style={{
                  borderRadius: "0.3rem"
                }}
                onClick={e => setProductData(p => ({ ...p, img_url: url }))}
              />)
              )}
            </div>
          </div>
        </div>

        <div className="col">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 border mb-1"
              style={{ borderRadius: "0.5rem" }}
            >
              <h1>{productData?.name || "Dummy Name"}{productData?.is_varified ? <sup><i className="ps-1 text-success fa-solid fa-circle-check" />
                <span style={{ fontSize: '0.8rem' }}>
                  varified
                </span>
              </sup> : null}
              </h1>
              <p className='text-danger mb-n1 pb-1'>Today's Deal</p>
              <h4>₹{productData?.price || 500}
                <sup style={{ textDecoration: 'line-through', color: 'red' }}>
                  ₹{productData?.mrp || 1000}
                </sup>
              </h4>
              {stars?.map((d, i) => !i ? null : <Star i={i} setStars={setStars} stars={stars} className="text-danger" />)}

              <h6 style={{ color: 'rgba(0,0,0,0.4)' }}>
                Item in stock:
                <span style={{ color: 'green' }}>
                  {productData?.in_stock_count || 0}
                </span></h6>
              <p className="card-text">
                {productData?.sub_description ||
                  `Some quick example text to build on the card title and make up the bulk of the card's content.`}
              </p>
              <h2>Description</h2>
              {productData?.description || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aperiam tempore pariatur deleniti hic repellat harum doloribus quasi neque excepturi, non deserunt id natus consequatur libero nihil quisquam rem quas.`}</div>
            {/* this is the fourth column for payment and emi options */}
            <div className="col-12 col-sm-12 border col-lg-6 bg-light mb-1"
              style={{ borderRadius: "0.5rem" }}
            >
              <br />
              <h4>₹{productData?.price || 500}
                <sup style={{ textDecoration: 'line-through', color: 'red' }}>
                  ₹{productData?.mrp || 1000}
                </sup>
              </h4>
              <h5>FREE delivery {(new Date(Date.now() + 3000 * 60 * 60 * 24)).toString().substring(0, 15)}. Details </h5>
              <h6>Or fastest delivery Tomorrow, {(new Date(Date.now() + 1000 * 60 * 60 * 24)).toString().substring(0, 10)}.
                <br /> Order within {Math.trunc(Math.random() * 10)} hrs {Math.trunc(Math.random() * 60)} mins. Details</h6>
              {productData?.in_stock_count ? <h4>In <span className='text-success'>Stock</span> </h4>
                : <h4>Out of <span className='text-danger'>Stock</span> </h4>}

              <h5>Sold by <span className='text-secondary'>{productData?.company_name || "Dummy Company Ltd"}</span> and Fulfilled by EShop.</h5>

              <center style={{ width: "100%" }}>
                <button className="btn btn-warning mx-auto mb-2" style={{ width: "100%" }}>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    icon={`fa-solid fa-cart-shopping`}
                    className='text-light'
                    height={25}
                    width={25}
                  />
                  {" "}Add to cart
                </button>
                <button className="btn btn-warning" style={{ width: "100%" }}>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    icon={`fa-solid fa-truck`}
                    className='text-light'
                    height={25}
                    width={25}
                  />
                  {" "}Buy Now
                </button>
              </center>
              <h6 style={{ textDecoration: "underline", cursor: "pointer" }}
                className="mt-1"
              >More EMI options</h6>
            </div>
          </div>
        </div>
      </div>
      <SecondaryProduct />
    </div>
  </>
  );
};

export default SingleProduct;
