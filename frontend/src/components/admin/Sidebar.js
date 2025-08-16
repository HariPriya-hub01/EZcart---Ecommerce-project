import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          <li>
            <NavDropdown
              title={
                <span
                  className="dropdown-toggle product-toggle d-flex align-items-center justify-content-between w-100"
                  style={{ paddingRight: "1rem" }}
                >
                  <span className="d-flex align-items-center">
                    <i className="fa-brands fa-product-hunt me-2"></i>Product
                  </span>
                  <i className="fa fa-caret-down"></i>
                </span>
              }
              className="custom-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => navigate("/admin/products")}>
                {" "}
                <i className="fa fa-shopping-basket" style={{ marginRight: "0.5rem" }}></i>All
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/admin/products/create")}>
                {" "}
                <i className="fa fa-plus" style={{ marginRight: "0.5rem" }}></i> Create{" "}
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-users"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
