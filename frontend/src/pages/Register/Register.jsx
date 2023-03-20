import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import axiosInstance from '../../helpers/axiosInstance';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post("/api/auth/register", userDetails);
    if (res.status == 200) {
      alert("Registered");
    }
  };

  return (<>
    <Navbar />
    {/* this is the main body of this page */}
    <div className="container mt-3 pt-3" style={{}} >
      <div className="row">
        <div className="col d-none d-sm-block"></div>
        <div className="col col-12 col-md-8 col-lg-6">
          <div className="row border border-warning align-middle"
            style={{ borderRadius: "0.5rem" }}
          >
            <center><h1 className="mb-3 mt-3">Register</h1></center>
            <div className="col-md-6 mx-auto mb-3">
              <form>
                {/* Name input */}
                <div className="mb-3">
                  <label htmlFor="input_name" className="form-label">Full Name</label>
                  <input type="text" className="form-control"
                    id="input_name"
                    placeholder="Enter your Full Name"
                    value={userDetails.name}
                    onChange={e => setUserDetails(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                {/* Address input */}
                <div className="mb-3">
                  <label htmlFor="input_addr" className="form-label">Address</label>
                  <textarea as="textarea" row={"3"} className="form-control"
                    id="input_addr" placeholder="Enter your Address"
                    value={userDetails.address}
                    onChange={e => setUserDetails(p => ({ ...p, address: e.target.value }))}
                  />
                </div>
                {/* Email input */}
                <div className="mb-3">
                  <label htmlFor="input_email" className="form-label">Email</label>
                  <input type="email"
                    className="form-control"
                    id="input_email"
                    placeholder="Enter your email"
                    value={userDetails.email}
                    onChange={e => setUserDetails(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
                {/* Name input */}
                <div className="mb-3">
                  <label htmlFor="input_password" className="form-label">Password</label>
                  <input type="password" className="form-control"
                    value={userDetails.password}
                    onChange={e => setUserDetails(p => ({ ...p, password: e.target.value }))}
                    id="input_password"
                    placeholder="Enter your name" />
                </div>

                <div className="form-check">
                  <input className="form-check-input btn-danger" type="checkbox" 
                  defaultValue id="flexCheckChecked" defaultChecked />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    Keep Me Logged In
                  </label>
                </div>
                {/* submit button */}
                <div className="d-grid gap-2 pt-3">
                  <button type="submit" id="login_submit"
                    onClick={handleSubmit}
                    className="btn btn-warning">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col d-none d-sm-block"></div>
      </div>
    </div>
    <br />
    <Footer />
  </>
  );
};

export default Register;
