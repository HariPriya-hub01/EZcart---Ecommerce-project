import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import Pagination from "react-js-pagination";
import Loader from ".././layouts/Loader";
import MetaData from ".././layouts/MetaData";
import Product from ".././product/Product";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const { keyword } = useParams();
  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const setCurrentPageNo = (pageNo) => setCurrentPage(pageNo);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
    }

    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [dispatch, error, currentPage, keyword, priceChanged, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Shop Easy"} />
          <h1 className="text-center mt-4">Search Products</h1>

          <section className="container mt-4">
            <div className="row">
              {/* Filters */}
              <div className="col-12 col-md-3 mb-4">
                <div className="p-3 shadow-sm rounded bg-light">
                  <h5>Price</h5>
                  <div onMouseUp={() => setPriceChanged(price)}>
                    <Slider
                      range={true}
                      marks={{ 1: "$1", 1000: "$1000" }}
                      min={1}
                      max={1000}
                      defaultValue={price}
                      onChange={(price) => setPrice(price)}
                      handleRender={(renderProps) => (
                        <Tooltip overlay={`$${renderProps.props["aria-valuenow"]}`}>
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      )}
                    />
                  </div>

                  <hr />

                  <h5 className="mt-4">Categories</h5>
                  <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        key={category}
                        // className={`mb-2 ${category === cat ? "fw-bold text-primary" : ""}`}
                        style={{ cursor: "pointer", listStyle: "none" }}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>

                  <hr />

                  <h5 className="mt-4">Ratings</h5>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li key={star} style={{ cursor: "pointer", listStyle: "none" }} onClick={() => setRating(star)}>
                        <div className="rating-outer">
                          <div className="rating-inner" style={{ width: `${star * 20}%` }}></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Products Grid */}
              <div className="col-12 col-md-9">
                {products && products.length > 0 ? (
                  <div className="row">
                    {products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <h4 className="text-center">No products found</h4>
                )}
              </div>
            </div>

            {/* Pagination */}
            {productsCount > 0 && productsCount > resPerPage ? (
              <div className="d-flex justify-content-center mt-4">
                <Pagination
                  activePage={currentPage}
                  onChange={setCurrentPageNo}
                  totalItemsCount={productsCount}
                  itemsCountPerPage={resPerPage}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                />
              </div>
            ) : null}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
