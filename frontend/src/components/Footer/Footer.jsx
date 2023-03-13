import React from 'react';

const Footer = () => {
  return (
    <div>
      <div>
        {/* a footer with four section */}
        <footer className="text-muted">
          <div className="bg-dark">
            <div className="row mx-auto pt-3 pb-3" style={{ maxWidth: '40rem' }}>
              <div className="col">
                <h5>
                  <a href="/products.html#nav-women" style={{ textDecoration: 'none' }} className="text-secondary">Women</a>
                </h5>
                <h6><a href="/products.html#nav-dress">Dress</a></h6>
                <h6><a href="/products.html#nav-pants">Pants</a></h6>
                <h6><a href="/products.html#nav-skirts">Skirts</a></h6>
              </div>
              <div className="col">
                <h5>
                  <a href="/products.html#nav-men" style={{ textDecoration: 'none' }} className="text-secondary">Men</a>
                </h5>
                <h6><a href="/products.html#nav-shirts">Sirts</a></h6>
                <h6><a href="/products.html#nav-men-pants">Pants</a></h6>
                <h6><a href="/products.html#nav-hoodies">Hoodies</a></h6>
              </div>
              <div className="col">
                <h5>
                  <a style={{ textDecoration: 'none' }} className="text-secondary" href="/products.html#nav-kids">Kids</a>
                </h5>
              </div>
              <div className="col">
                <h5>Links</h5>
                <h6><a href="index.html">Home</a></h6>
                <h6><a href="login.html">Login</a></h6>
                <h6><a href="contact.html">Contact</a></h6>
              </div>
            </div>
            <hr />
            <div className="row pb-3">
              <center>
                <h5 className='text-secondary'>Copyright ©️ E-Shop 2022-23</h5>
              </center>
            </div>
          </div>
        </footer>
        {/* this is used for notification */}
        {/* mount point for notifications */}
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
            <div id="notify_item_details" />
            <div className="toast-body" id="notify_items_count">Total 0 items in cart</div>
          </div>
        </div>
        {/* this Button trigger modal */}
        {/* this button is hidden and click using javascript */}
        <button type="button" className="btn btn-primary" id="modal_button" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Hidden button
        </button>
        {/* Modal will be available of every page */}
        {/* this is the modal which will appear on above button click */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="modal_title" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modal_title">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body" id="modal_body">...</div>
              <div className="modal-footer">
                <button type="button" id="modal_lbutton" className="btn btn-secondary" data-bs-dismiss="modal" />
                <button type="button" id="modal_rbutton" className="btn btn-primary" data-bs-dismiss="modal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
