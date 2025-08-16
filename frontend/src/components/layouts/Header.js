import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import cartIcon from "../../assets/trolley.gif";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar row sticky-top custom-navbar rounded">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/" className="logo-container">
            <img width="200px" className="pl-1 logo-img" alt="EZCart Logo" src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline profile">
            <figure className="avatar avatar-nav">
              <Image width="50px" src={user.avatar ?? "/images/default_avatar.png"} />

            </figure>
            <Dropdown.Toggle
              variant="default"
              id="dropdown-basic"
              className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md"
            >
              <span>{user.name}    </span>
              <i className="fa-solid fa-chevron-down text-sm mt-[1px]"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="profile-dropdown">
              {user.role === "admin" && (
                <Dropdown.Item
                  onClick={() => {
                    navigate("admin/dashboard");
                  }}
                >
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={() => {
                  navigate("/myprofile");
                }}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className="text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}
        <Link to="/cart" className="position-relative ml-3" id="cart">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          {isAuthenticated ? <span id="cart_count">{cartItems.length}</span> : null}

        </Link>
      </div>
    </nav>
  );
}
