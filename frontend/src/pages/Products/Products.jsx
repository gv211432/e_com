import React from 'react';
import { useParams } from 'react-router-dom';
import "./Products.css";

const Products = () => {
  const params = useParams();

  return (
    <>
      <div>
        <div className="container" style={{ minHeight: '80vh' }}>
          {/* this is the conten page for navigation bar which can be toggled and changed */}
          <div className="tab-content mt-3 mb-3" id="nav-tabContent">
            <div className="tab-pane fade" id="nav-product" role="tabpanel" aria-labelledby="nav-product-tab" />
            {/* women section */}
            <div className="tab-pane fade" id="nav-women" role="tabpanel" aria-labelledby="nav-women-tab" />
            {/* women sub section */}
            <div className="tab-pane fade" id="nav-dress" role="tabpanel" aria-labelledby="nav-dress-tab" />
            <div className="tab-pane fade" id="nav-pants" role="tabpanel" aria-labelledby="nav-pants-tab" />
            <div className="tab-pane fade" id="nav-skirts" role="tabpanel" aria-labelledby="nav-skirts-tab" />
            {/* men section */}
            <div className="tab-pane fade" id="nav-men" role="tabpanel" aria-labelledby="nav-men-tab" />
            {/* men subsection */}
            <div className="tab-pane fade" id="nav-men-pants" role="tabpanel" aria-labelledby="nav-men-pants-tab" />
            <div className="tab-pane fade" id="nav-hoodies" role="tabpanel" aria-labelledby="nav-hoodies-tab" />
            <div className="tab-pane fade" id="nav-shirts" role="tabpanel" aria-labelledby="nav-shirts-tab" />
            {/* kids section */}
            <div className="tab-pane fade" id="nav-kids" role="tabpanel" aria-labelledby="nav-kids-tab" />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Products;
