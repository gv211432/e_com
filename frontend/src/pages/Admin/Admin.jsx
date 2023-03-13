
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


import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Card from '../../components/Carousel/Card';
import Featured from '../../components/Carousel/Featured';
import axiosInstance from '../../helpers/axiosInstance';

const Admin = () => {
  const [productData, setProductData] = useState({
    product_id: "",
    name: "",
    sub_description: "",
    description: "",
    tags: "",
    rating: "",
    price: "",
    mrp: "",
    is_varified: true,
    all_img_url: [],
    company_name: "",
    in_stock_count: "",
    category: "General",
  });

  const [imgFiles, setImgFiles] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [selectUserImg, setSelecteUserImg] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);

  const [cardData, setCardData] = useState({
    name: productData.name,
    id: productData.product_id,
    tag: productData.tags,
    img_url: "",
    description: productData.sub_description,
    price: productData.price
  });

  useEffect(() => {
    let intervals;
    if (selectUserImg.length) {
      if (imgIndex < selectUserImg.length) {
        console.log(selectUserImg);
        setCardData(p => ({ ...p, img_url: selectUserImg[imgIndex] }));
        setImgIndex(p => p + 1);
      }

      intervals = setInterval(() => {
        if (imgIndex < selectUserImg.length) {
          setCardData(p => ({ ...p, img_url: selectUserImg[imgIndex] }));
          setImgIndex(p => p + 1);
        } else {
          setImgIndex(0);
        }
      }, 4000);
    }
    return () => clearInterval(intervals);
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
              <Card entry={cardData} index={0} />
            </center>
            <br />
          </div>
          <div className="row">
            <center>
              Preview <span className='text-primary' style={{ cursor: "pointer" }}>
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
              <div className="mb-3">
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
                      setProductData(p => ({ ...p, is_varified: !p.is_varified }));
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
              <div className="mb-3">
                <label className="form-label">
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
                {selectUserImg?.map(d => <img width={"100rem"} height={"100rem"}
                  className='m-1 img-fluid border border-warning' src={d} alt=""
                  style={{ borderRadius: "0.3rem" }}
                />)}
              </div>

              <div className="row mb-3 mt-3">
                <div className="col">
                  <input
                    className="form-control form-control-sm mx-auto bg-secondary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelecteUserImg([]);
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
                  <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" />
                  <label className="form-check-label" htmlFor="disabledFieldsetCheck">
                    Accecpt all <a href='#' style={{ textDecoration: "underline" }}>
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

export default Admin;
