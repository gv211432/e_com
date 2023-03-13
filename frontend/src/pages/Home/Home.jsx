import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import "./Home.css";

const Home = () => {
  return (<>
    <Navbar />
    {/* this is the hero section of the page */}
    <div id="hero-main">
      {/* this has hero bg image */}
      <div id="hero-img" style={{
        backgroundImage: `url("img/hero-img.jpg")`
      }} />
      {/* this has content of the hero section */}
      <div id="hero-content">
        <div className="container" id="bg-img-div">
          <div className="row">
            <div className="col" style={{ zIndex: 20 }}>
              <center>
                <div id="e-shop-logo">
                  <img className="img-fluid" src="/img/E-ShopLogo.png" alt="e-shop logo" height="120px" style={{ opacity: '0.8' }} />
                  <h5 id="brand-discription" style={{ opacity: '0.8' }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Architecto maxime eius illum qui accusamus recusandae
                    repellat, in repellendus dolores dolore velit ad mollitia?
                    Nulla voluptatibus velit culpa? Quia, suscipit nulla.
                  </h5>
                  <br />
                  <button className="btn btn-warning ps-6 pe-6 lh-1" style={{ borderRadius: '15px 0 15px 0', minWidth: '50%' }}
                    onclick="click_handle('Hello gaurav')">
                    <span style={{ fontSize: '2rem', fontWeight: 300, color: 'rgb(240, 240, 240)' }}>Start Shopping</span>
                    <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: '2rem', marginLeft: '0.1rem', verticalAlign: 'middle' }} />
                  </button>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Home;
