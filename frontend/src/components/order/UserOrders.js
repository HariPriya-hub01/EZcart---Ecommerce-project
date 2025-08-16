import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import './UserOrders.css'

export default function UserOrders() {
  const { userOrders = [] } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    userOrders.forEach((userOrder) => {
      data.rows.push({
        id: userOrder._id,
        numOfItems: userOrder.orderItems.length,
        amount: `$${userOrder.totalPrice}`,
        status:
          userOrder.orderStatus && userOrder.orderStatus.includes("Delivered") ? (
            <p style={{ color: "green" }}> {userOrder.orderStatus} </p>
          ) : (
            <p style={{ color: "red" }}> {userOrder.orderStatus} </p>
          ),
        actions: (
          <Link to={`/order/${userOrder._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title="My Orders" />
      <h1 className="mt-5 text-center text-md-start px-3">My Orders</h1>
      <div className="order-table d-none d-md-block px-3">
        <MDBDataTable bordered striped hover data={setOrders()} />
      </div>

      {/* for mobile screen */}
      <div className="order-cards d-md-none px-3 mt-4">
        {userOrders.map((order) => (
          <div className="order-card" key={order._id}>
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Items:</strong> {order.orderItems.length}
            </p>
            <p>
              <strong>Amount:</strong> ${order.totalPrice}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: order.orderStatus.includes("Delivered") ? "green" : "red" }}>
                {order.orderStatus}
              </span>
            </p>
            <Link to={`/order/${order._id}`} className="btn btn-sm btn-primary mt-2">
              <i className="fa fa-eye"></i> View Details
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
