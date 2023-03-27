import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import UserContext from '../../context/globalContext';
import axiosInstance from '../../helpers/axiosInstance';

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post("/api/auth/login", userDetails);
    if (res.status == 200) {
      setIsLoggedIn(true);
      navigate("/");
    }
  };
  return (<>
    <Navbar />
    {/* this is the main body of this page */}
    <div className="container mt-3 pt-3" style={{}} >
      <div className="row" style={{ minHeight: "90%" }}>
        <div className="col d-none d-sm-block"></div>
        <div className="col col-12 col-md-8 col-lg-6">
          <div className="row border border-warning align-middle"
            style={{ borderRadius: "0.5rem" }}
          >
            <center><h1 className="mb-3 mt-3">Login</h1></center>
            <div className="col-md-6 mx-auto mb-3">
              <form>
                {/* Email input */}
                <div className="mb-3">
                  <label htmlFor="input_email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="input_email"
                    value={userDetails.username}
                    onChange={e => setUserDetails(p => ({ ...p, username: e.target.value }))}
                    placeholder="Enter your email" aria-describedby="emailHelp"
                  />
                </div>
                {/* Name input */}
                <div className="mb-3">
                  <label htmlFor="input_password" className="form-label">Password</label>
                  <input type="password"
                    className="form-control"
                    id="input_password"
                    value={userDetails.password}
                    onChange={e => setUserDetails(p => ({ ...p, password: e.target.value }))}
                    placeholder="Enter your name" />
                </div>
                {/* submit button */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    id="login_submit"
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
    <br />
    <br />
    <Footer />
  </>
  );
};

export default Login;
