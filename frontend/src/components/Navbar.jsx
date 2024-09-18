import React, { useEffect, useState } from "react";
import "./../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [User, setUser] = useState();

  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const storedRole= localStorage.getItem("role")
  const cartItems=useSelector(state=>state.cart)
 const cartLength=cartItems.length;
  console.log("cart item: ",cartLength);
  console.log("cart item: ",cartItems);

  

  useEffect(() => {
    setUser(storedUser);
  }, [storedUser]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userId")
    navigate("/login");
  };

  return (
    <div className="nav_bar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">ShopCart
            {/* Mobile CartShop <span id="cart-icon"><img src="../../public/cart-icon-28341.png"></img></span> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mobiles
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Mobiles under 9999
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Mobiles under 14999
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              {/* <li className="nav-item">
                <Link to="/login" className="nav-link" href="#">
                  Login 
                </Link>
              </li> */}
            </ul>
                {storedRole==='admin'?<Link to="/admin">Admin Panel</Link>: <Link to='/orders'>Orders( {cartLength} )</Link> }
            <form className="d-flex" role="search">
              <span className="nav-search">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </span>

              <button className="btn btn-success" type="submit">
                Search
              </button>

              {User ? (
                <span id="Profile">
                  <i className="fa-solid fa-user"></i> {User}{" "}
                  <button className="btn btn-danger" onClick={handleLogOut}>
                    logout
                  </button>
                </span>
               

              ) : (
                <Link to="/login">
                  <button className="btn btn-info" onClick={handleLogOut}>
                    log-in
                  </button>
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
