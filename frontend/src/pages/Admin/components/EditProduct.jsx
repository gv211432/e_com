
// Requrired filds for the product generation
// 0. is_varified
// 1. All images array
// 2. Name
// 3. maximum retail price
// 4. selling price
// 5. stars
// 6. in_stock items
// 7. short description
// 8. long description
// 9. tags
// 10. category
// 11. Owner


import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Card from '../../../components/Carousel/Card';
import CardLocal from '../../../components/Carousel/CardLocal';
import config from '../../../config';
import UserContext from '../../../context/globalContext';
import axiosInstance from '../../../helpers/axiosInstance';

const EditProduct = () => {
  const { setProductData: setGlobalData, productData: globalData, setImgFiles, imgFiles } = useContext(UserContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [productData, setProductData] = useState(state?.data ? state?.data : globalData);
  const [selectUserImg, setSelecteUserImg] = useState(productData.all_img_url);
  const [isLocal, setIsLocal] = useState(true);
  useEffect(() => {
    if (selectUserImg) {
      setProductData(p => ({ ...p, img_url: selectUserImg[0], all_img_url: selectUserImg }));
    }
  }, [selectUserImg]);

  const handleProductSave = async (img_urls) => {
    const res = await axiosInstance.post("/api/product/create", {
      ...productData,
      all_img_url: img_urls
    });
    if (res.status == 200) {
      alert("success");
    }
  };

  // this uploads img and new tweet
  const handleFileUpload = async (e) => {
    e.preventDefault();
    let uploadedImgUrl = [];
    let count = 0;
    if (imgFiles) {
      imgFiles.forEach(async (d) => {
        const formData = new FormData();
        formData.append('file', d);
        const res = await axiosInstance.post("/api/common/upload", formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        });
        count++;
        if (res.status == 200) {
          uploadedImgUrl.push(res?.data?.file?.filename);
          if (count == imgFiles.length) {
            handleProductSave(uploadedImgUrl);
          }
        } else {
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row border border-warning m-3"
        style={{ borderRadius: "0.5rem" }}>
        {/* product overview */}
        <div className="col p-2">
          <div className="row"
            style={{ borderRadius: "0.5rem" }}
          >
            <center>
              <CardLocal entry={productData} index={0} local={isLocal} />
            </center>
            <br />
          </div>
          <div className="row">
            <center>
              Preview <span className='text-primary'
                onClick={e => {
                  setGlobalData(productData);
                  sessionStorage.setItem("product_info", JSON.stringify(productData));
                  navigate("/show_product", { state: { data: productData } });
                }}
                style={{ cursor: "pointer" }}>
                this product{" "}
              </span>
              page.
            </center>
          </div>
        </div>

        {/* add product details */}
        <div className="col">
          <div className="col bg-light border m-1 border p-2"
            style={{ borderRadius: "0.5rem" }}
          >
            <form>
              <center>
                <h3>Create New Product</h3>
              </center>
              <div className="mb-1">
                <label className="form-label text-muted">
                  Upload Images of the Product
                </label>
                <input
                  className="form-control form-control-sm"
                  id={"input_img_files"}
                  type="file"
                  name="file"
                  size="sm"
                  multiple
                  onChange={(e) => {
                    for (const d of e.target.files) {
                      setImgFiles(p => [...p, d]);
                      const reader = new FileReader();
                      reader.readAsDataURL(d);
                      reader.onload = (e) => {
                        setSelecteUserImg(p => [...p, e.target.result]);
                        // setProductData(p => ({ ...p, all_img_url: [...(p.all_img_url), e.target.value] }));
                      };
                    }
                  }}
                />
              </div>

              <div>
                {selectUserImg.length ? <p className='text-muted' style={{ marginBottom: "-0.1rem" }}>Select the below image to fit in left card.</p> : null}
                {selectUserImg?.map(d => <img width={"100rem"} height={"100rem"}
                  className={`m-1 img-fluid border border-warning ${productData.img_url == d ? "border-3" : ""}`}
                  src={d[13] == "-" ? `${config.baseURI}:${config.port}/api/common/files/${d}` : d}
                  alt={d}
                  style={{ borderRadius: "0.3rem" }}
                  onClick={e => {
                    if (d[13] == "-") {
                      setIsLocal(false);
                    } else {
                      setIsLocal(true);
                    }
                    setProductData(p => ({ ...p, img_url: d }));
                  }}
                />)}
                {/* {productData.all_img_url?.map(d => <img width={"100rem"} height={"100rem"}
                  className={`m-1 img-fluid border border-warning ${productData.img_url == d ? "border-3" : ""}`}
                  src={d} alt=""
                  style={{ borderRadius: "0.3rem" }}
                  onClick={e => {
                    setIsLocal(false);
                    setProductData(p => ({ ...p, img_url: d }));
                  }}
                />)} */}
              </div>
              <div className="mt-3 mb-3">
                <input
                  className="form-control form-control-sm "
                  type="text"
                  placeholder='Name of Product'
                  value={productData.name}
                  onChange={e => {
                    e.preventDefault();
                    setProductData(p => ({ ...p, name: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-3 ps-2">
                <div className="form-check">
                  <input className="form-check-input"
                    type="checkbox"
                    checked={productData.is_varified}
                    onChange={e => {
                      e.preventDefault();
                      setProductData(p => ({ ...p, is_varified: !(p.is_varified) }));
                    }}
                  />
                  <label className="form-check-label" htmlFor="disabledFieldsetCheck">
                    Show Is Varified Lable
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    value={productData.category}
                    onChange={e => {
                      e.preventDefault();
                      setProductData(p => ({ ...p, category: e.target.value }));
                    }}
                  >
                    <option selected>General</option>
                    <option value={1}>Kitchenware</option>
                    <option value={2}>Houseware</option>
                    <option value={3}>Hardware</option>
                    <option value={4}>Cloths</option>
                    <option value={5}>Food</option>
                    <option value={6}>Service</option>
                    <option value={7}>Books</option>
                    <option value={8}>Grocery</option>
                  </select>
                  <label htmlFor="floatingSelectGrid">Select the product category</label>
                </div>
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm "
                  type="number"
                  placeholder='Max Retail Price'
                  value={productData.mrp}
                  onChange={e => {
                    e.preventDefault();
                    if (parseInt(e.target.value) || e.target.value == "")
                      setProductData(p => ({ ...p, mrp: e.target.value }));
                    else toast("Hello");
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm "
                  type="number"
                  placeholder='Selling Price'
                  value={productData.price}
                  onChange={e => {
                    e.preventDefault();
                    if (parseInt(e.target.value) || e.target.value == "")
                      setProductData(p => ({ ...p, price: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm "
                  type="number"
                  placeholder='Star Rating'
                  value={productData.rating}
                  onChange={e => {
                    e.preventDefault();
                    if (parseInt(e.target.value) || e.target.value == "")
                      setProductData(p => ({ ...p, rating: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm "
                  type="number"
                  placeholder='In Stock Quantity'
                  value={productData.in_stock_count}
                  onChange={e => {
                    e.preventDefault();
                    if (parseInt(e.target.value) || e.target.value == "")
                      setProductData(p => ({ ...p, in_stock_count: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  rows={2}
                  className="form-control form-control-sm "
                  type="text"
                  placeholder='Short Description'
                  value={productData.sub_description}
                  onChange={e => {
                    e.preventDefault();
                    setProductData(p => ({ ...p, sub_description: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  rows={5}
                  className="form-control form-control-sm "
                  type="text"
                  placeholder='Long Description'
                  value={productData.description}
                  onChange={e => {
                    e.preventDefault();
                    setProductData(p => ({ ...p, description: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm "
                  type="text"
                  placeholder='Add space seperated tags'
                  value={productData.tags}
                  onChange={e => {
                    e.preventDefault();
                    setProductData(p => ({ ...p, tags: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm "
                  type="text"
                  placeholder='Add Company Name to Show'
                  value={productData.company_name}
                  onChange={e => {
                    e.preventDefault();
                    setProductData(p => ({ ...p, company_name: e.target.value }));
                  }}
                />
              </div>
              <div className="row mb-3 mt-3">
                <div className="col">
                  <input
                    className="form-control form-control-sm mx-auto bg-secondary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelecteUserImg([]);
                      document.getElementById("input_img_files").value = "";
                    }}
                    value='Reset Images'
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control form-control-sm mx-auto bg-danger"
                    type="submit"
                    value='Reset Full'
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("input_img_files").value = "";
                      setProductData({
                        product_id: "",
                        name: "",
                        sub_description: "",
                        description: "",
                        tags: "",
                        rating: "",
                        price: "",
                        mrp: "",
                        is_varified: "",
                        all_img_url: [],
                        company_name: "",
                        in_stock_count: "",
                        category: "General",
                      });
                      setSelecteUserImg([]);
                    }}
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control form-control-sm mx-auto bg-warning"
                    type="submit"
                    value='Create'
                    onClick={handleFileUpload}
                  />
                </div>
              </div>

              <div className="mb-3 ps-2">
                <div className="form-check">
                  <input className="form-check-input" checked type="checkbox" id="disabledFieldsetCheck" />
                  <label className="form-check-label" htmlFor="disabledFieldsetCheck">
                    Accecpt all <a
                      style={{ textDecoration: "underline" }}
                    >
                      terms & conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
