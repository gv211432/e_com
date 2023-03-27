import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";
import axiosInstance from '../../helpers/axiosInstance';
import Navbar from "../../components/Navbar/Navbar";
import config from '../../config';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Cart = () => {
  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
  };
  // const [data, setData] = useState([{
  //   name: "Blue hoodie",
  //   id: 1,
  //   tag: "hoodie",
  //   etag: "cloths wears men fashion ",
  //   img_url: "/img/products/men/hoodies/blue-hood.jpg",
  //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto consequuntur vero sunt provident illo sit nihil, nesciunt atque magni explicabo eveniet optio ut quam fugit debitis, hic laborum. Eius, hic.",
  //   price: "789",
  //   no: 9
  // }]);

  const [data, setData] = useState([]);

  // let cart_data = JSON.parse(data);
  const summary_total = {
    val: 0,
    get: () => summary_total.val,
    set: (n) => {
      summary_total.val = n;
    },
  };
  // console.log(cart_data);

  // var makeid = (length) => {
  //   let characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let result = "";
  //   let characters_length = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters_length));
  //   }
  //   return result;
  // };

  // this returns dynamic html rows to feed in "Summary" section
  const create_summary_row = (key, value, color) => {
    let summary_templet = `
    <div class="row">
      <div class="col mb-2 text-muted"  style="text-align: left">
        ${key}
      </div>
      <div class="col mb-2 ${color ? "text-" + color : "text-muted"
      }" style="text-align: right">
        ${value}
      </div>
    </div>
  `;
    return summary_templet;
  };

  // this calculated the summary of present items in cart
  // and displays it in "Summary" section on cart page
  const preapare_summary = () => {
    let summary_data = "";
    // let cart = data;
    let cart_arr = data;
    let total = 0;
    data?.forEach((data) => {
      total += data.price * (data?.no || 1);
    });
    summary_data += create_summary_row("Cost", "₹" + (total?.toString() || "0"));
    if (total > 0) {
      summary_data += create_summary_row("Delivery", "+₹100", "danger");
      summary_data += create_summary_row("Promocode", "-₹50", "success");
      summary_data += "<hr>";
      total += 150;
      summary_data += create_summary_row("Sub total", "₹" + total.toString());
      let gst = ((total * 18) / 100).toFixed(2);
      summary_data += create_summary_row(
        "GST(18%)",
        "+₹" + gst.toString(),
        "danger"
      );
      summary_data += "<hr>";
      total += parseInt(gst);
      summary_data += create_summary_row("Total", "₹" + total.toString());
    }
    summary_total.set(total);
    let summary_mount_point = document.getElementById("summary_mount_point");
    summary_mount_point.innerHTML = summary_data;
  };

  const fetchData = async () => {
    const res = await axiosInstance.post("/api/cart/fetch_cart");
    if (res.status == 200) {
      setData(res?.data?.data[0]?.product);
    }
  };

  useEffect(() => {
    preapare_summary(); // call it initially
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);


  // // this returns dynamic html card to feed in "Items in cart"
  // // setcion
  // var create_cart_item_card = (item, index) => {
  //   let item_card_templet = `
  // <!-- card row  -->
  // <div class="input-group mb-3">
  //   <span class="input-group-text">
  //     <img
  //       src="${item.img_url}"
  //       style="max-width: 150px; max-height: 100px; border-radius:6px;"
  //     />
  //   </span>
  //   <span class="form-control">
  //     <div class="row">
  //       <div class="col-lg">
  //       <h5>${item.name}
  //       </h5>
  //       </div>
  //       <div class="col">
  //         <h4
  //           class="text-muted"
  //           style="text-align: right"
  //         >
  //         ₹${item.price ? item.price : 1000}
  //         </h4>
  //       </div>
  //     </div>
  //     <div class="row">
  //       <div class="col-lg">
  //         <button
  //           class="btn btn-danger mb-1"
  //           onclick="delete_item('${item.name}')"
  //         >
  //           <i class="fa-solid fa-trash"></i>
  //         </button>
  //         <sub class="text-muted ps-2">Tags:</sub>
  //         <sub class="rounded-pill bg-success p-1 ps-2 pe-2 text-light" style="font-size:0.7rem">${item.tag
  //     }</sub>

  //       </div>
  //       <div class="col input-group mb-3">
  //         <button
  //           class="input-group-text btn btn-secondary"
  //           onclick="inc_dec_items(false, '${item.name}')"
  //         >
  //           -
  //         </button>
  //         <input
  //           type="text"
  //           class="form-control"
  //           value="${item.no ? item.no : 1}"
  //           id="${item.name}"
  //           readonly
  //         />
  //         <button
  //           class="input-group-text btn btn-secondary"
  //           onclick="inc_dec_items(true, '${item.name}')"
  //         >
  //           +
  //         </button>
  //       </div>
  //     </div>
  //   </span>
  // </div>`;
  //   return item_card_templet;
  // };

  // // this loads the cart items in "Items in cart"
  // var load_cart = (override) => {
  //   let item_card_group = `
  //   <h5 class="card-title">
  //   <i
  //     class="fa-solid fa-cart-shopping text-dark me-2"
  //     style="
  //       font-size: 2rem;
  //       margin-left: 0.1rem;
  //       vertical-align: middle;
  //     "
  //   ></i>Items in cart
  //   </h5>
  //   <hr />
  // `;

  //   cart_data.forEach((item, index) => {
  //     item_card_group += create_cart_item_card(item, index);
  //   });
  //   let cards_mount_point = document.getElementById("item_card_mount_point");
  //   // if override id undefine or false, append the content
  //   override
  //     ? (cards_mount_point.innerHTML = item_card_group)
  //     : (cards_mount_point.innerHTML += item_card_group);
  // };

  // load_cart(); // call it initially


  // var checkout_cart = () => {
  //   console.log("Cart checkedout..");
  //   push_notification(
  //     { img_url: "/img/logo.png" },
  //     "Please login to place order!!",
  //     `<a href='login.html#checkout/?total=${summary_total.get()}&ref=${makeid(
  //       12
  //     )}'><b>Goto Login page.. <i class="fa-solid fa-right-to-bracket" sytle="font-size:1.4rem; align-item:right"></i></b></a>`
  //   );
  // };

  return (<>
    <Navbar />
    <div className="container" style={{ minHeight: '80vh' }}>
      {/* this  is the row of two column, Items in cart and summary  */}
      <div className="row mt-3 mb-3 mx-auto">
        {/* Items in cart */}
        <div className="col-lg-9 mt-3 mb-3">
          <div className="row">
            <div className="card">
              <div className="card-body" id="item_card_mount_point">
                {data.map((item, index) => (<div class="input-group mb-3">
                  <span className="input-group-text">
                    <img src={item?.all_img_url?.length ? `${config.baseURI}:${config.port}/api/common/files/${item?.all_img_url[0]}` :
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6at7RwZOM_yVpsUZWimO0o75bYbKAE1DaTg&usqp=CAU"
                    }
                      style={{ maxWidth: 150, maxHeight: 100, borderRadius: 6 }}
                    />
                  </span>
                  <span className="form-control">
                    <div className="row">
                      <div className="col-lg">
                        <h5>{item.name}
                        </h5>
                      </div>
                      <div className="col">
                        <h4
                          className="text-muted"
                          style={{ textAlign: "right" }}
                        >
                          ₹{item.price ? item.price : 1000}
                        </h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg">
                        <button
                          className="btn btn-danger mb-1"
                          onClick={async () => {
                            const res = await axiosInstance.post("/api/cart/remove_from_cart", {
                              product_id: item?._id
                            });
                            if (res.status == 200) {
                              fetchData();
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-trash"
                            height={23}
                            width={20}
                          />
                        </button>
                        <sub className="text-muted ps-2">Tags:</sub>
                        <sub classname="rounded-pill bg-success p-1 ps-2 pe-2 text-light"
                          style={{ fontSize: '0.7rem' }}>
                          {item.tag}
                        </sub>
                      </div>
                      <div className="col input-group mb-3">
                        <button
                          className="input-group-text btn btn-secondary"
                          onClick={() => setData(p => p?.map((d) => (d?._id == item?._id && d?.no > 0)
                            ? ({ ...d, no: ((d?.no || 1) - 1) })
                            : d))}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          value={item.no ? item.no : 1}
                          id="${item.name}"
                          readonly
                        />
                        <button
                          className="input-group-text btn btn-secondary"
                          onClick={() => setData(p => p?.map((d) => d?._id == item?._id
                            ? ({ ...d, no: ((d?.no || 1) + 1) })
                            : d))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </span>
                </div>)
                )}
              </div>
            </div>
          </div>
        </div>
        {/* summary */}
        <div className="col-lg-3 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fa-solid fa-money-bill text-dark me-2"
                  style={{ fontSize: '2rem', marginLeft: '0.1rem', verticalAlign: 'middle' }} />
                Summary
              </h5>
              <hr />
              <div id="summary_mount_point" />
              <div className="row mx-auto">
                <button className="btn btn-warning" option >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  </>
  );
};

export default Cart;
