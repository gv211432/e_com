import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import UserContext from '../../context/globalContext';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      <div>
        {/* main navbar  */}
        <nav className="navbar navbar-expand-lg lh-3 navbar-light bg-dark" id="app-main-header">
          <div className="container-fluid">
            {/* this is logo */}
            <NavLink className="navbar-brand mt-1 mb-1 text-light me-auto"
              style={{ minWidth: '11rem' }} to="/">
              <img src="/img/E-ShopLogo.png" alt="e-shop" height="50px"
                style={{ margin: '-10px auto -10px auto' }} />
            </NavLink>
            {/* this is hamburger button for menu on mobile device */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            {/* this section will automatically will collaspe on small screen */}
            <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent">
              {/* this is search bar */}
              <div className="dropdown mt-1 mx-auto">
                {/* this is a search bar and search button */}
                <form action="#" className="input-group mt-1 mx-auto" style={{ maxWidth: '33rem' }}>
                  <input type="search" id="search_product_bar"
                    className="form-control"
                    placeholder="Product name, Category name, etc."
                    aria-label="Product name, Category name, etc."
                    style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 15 }}
                    autoCorrect="off" autoComplete="off"
                    aria-describedby="basic-addon2" />
                  <input type="submit"
                    className="input-group-text bg-warning ps-3 pe-3"
                    defaultValue="Search"
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 15 }}
                    id="search_product_button" />
                </form>
                <ul className="dropdown-menu mx-auto mt-2"
                  id="search_result_mount_point"
                  aria-labelledby="dropdown_search_menu">
                  <li className="ps-4 pe-2">
                    <i className="fa-solid fa-magnifying-glass" />
                    <span className="text-muted"> Type to start searching...</span>
                  </li>
                </ul>
              </div>
              {/* this is login button */}
              <div className="mt-2 mb-1 ms-2 me-3" style={{ maxWidth: '13rem' }}>
                <span className="btn-group" role="group">
                  {!isLoggedIn && <NavLink to="/login" className="btn btn-warning" style={{ borderRadius: '0.6rem', }}>
                    Login
                  </NavLink>}
                  <NavLink to="/cart">
                    <FontAwesomeIcon
                      height={40}
                      width={40}
                      icon="fa-solid fa-cart-shopping"
                      className='text-light mt-1 ms-3'
                    />
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger me-3">
                      9
                      <span className="visually-hidden">Cart Items</span>
                    </span>
                  </NavLink>
                  {isLoggedIn && <NavLink to="/cart"
                    className='bg-danger mt-1 ms-3'
                    style={{
                      height: "2rem", width: "2rem",
                      borderRadius: "50%",
                      backgroundImage: `url("data:image/png;base64,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")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain"
                    }}
                  >
                  </NavLink>}
                </span>
                <span id="show_cart_count"
                  className="position-absolute text-light translate-middle bg-danger rounded-pill ps-1 pe-1">
                </span>
              </div>
            </div>
          </div>
        </nav>
        {/* secondary navbar */}
        <nav className="navbar navbar-light bg-warning lh-1" style={{ padding: '-10px auto -10px auto' }} id="app_sub_header">
          <div className="container-fluid">
            <div className="container">
              <center>
                <div className="row" style={{ marginTop: '-0.2rem', maxWidth: '30rem' }}>
                  <div className="col">
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</NavLink>
                  </div>
                  <div className="col">
                    <NavLink to="/products#nav-product" style={{ textDecoration: 'none', color: 'black' }}>Products</NavLink>
                  </div>
                  <div className="col dropdown">
                    <NavLink className="dropdown-toggle" to="#" role="button" style={{ textDecoration: 'none', color: 'black' }} id="dropdownMenuWomen" data-bs-toggle="dropdown" aria-expanded="false">
                      Women
                    </NavLink>
                    <ul className="dropdown-menu" style={{ outline: 'none', outlineWidth: 0 }} aria-labelledby="dropdownMenuWomen" id="women_dropdown_conten">
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-women">All Products</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-dress">Dresses</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-pants">Pants</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-skirts">Skirts</NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="col dropdown">
                    <NavLink className="dropdown-toggle" to="#" role="button" style={{ textDecoration: 'none', color: 'black' }} id="dropdownMenuMen" data-bs-toggle="dropdown" aria-expanded="false">
                      Men
                    </NavLink>
                    <ul style={{ outline: 'none' }} className="dropdown-menu" id="dropdown_men_content" aria-labelledby="dropdownMenuMen">
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-men">All Products</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-shirts">Shirts</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-men-pants">Pants</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/products#nav-hoodies">Hoodies</NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <NavLink to="/products#nav-kids" style={{ textDecoration: 'none', color: 'black' }}>Kids</NavLink>
                  </div>
                  <div className="col">
                    <NavLink to="/contact" style={{ textDecoration: 'none', color: 'black' }}>Contact</NavLink>
                  </div>
                </div>
              </center>
            </div>
          </div>
        </nav>
      </div >
    </>
  );
};

export default Navbar;
