const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");

//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  const filteredProductsCount = await apiFeatures.query
    .clone()
    .countDocuments({});
  const totalProductsCount = await Product.countDocuments();
  let productsCount = totalProductsCount;

  if (filteredProductsCount !== totalProductsCount) {
    productsCount = filteredProductsCount;
  }

  const products = await apiFeatures.paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    products,
  });
});

//Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get Single Product - api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user",
    "name email"
  );

  console.log(product);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(201).json({
    success: true,
    product,
  });
});

//Update Product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  //uploading images
  let images = [];

  //if images not cleared we keep existing images
  if (req.body.imagesCleared === "false") {
    images = product.images;
  }
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product - api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted!",
  });
});

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);
  //finding user review exists
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //updating the  review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //find the average of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "name email"
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  //filtering the reviews which does match the deleting review id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  //number of reviews
  const numOfReviews = reviews.length;

  //finding the average with the filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  //save the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({
    success: true,
    products,
  });
});

//Add cart Items to user
exports.addUserCarts = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  //user.cart = []

  let userCart = [...user.cart];

  if (userCart.length == 0) {
    userCart.push({
      product: data.product,
      name: data.name,
      price: data.price,
      stock: data.stock,
      quantity: data.quantity,
      image: data.image,
    });
  } else {
    console.log("else statement");

    let exists = false;

    userCart.forEach((cart) => {
      if (cart.product == data.product) {
        console.log(data.quantity);

        cart.quantity = data.quantity;
        exists = true;
      }
    });

    if (!exists) {
      userCart.push({
        product: data.product,
        name: data.name,
        price: data.price,
        stock: data.stock,
        quantity: data.quantity,
        image: data.image,
      });
    }
  }

  user.cart = userCart;

  await user.save();

  res.status(200).send({
    success: true,
    message: "Cart Successfully Added..!",
    cart: userCart,
  });
});

//Delete User Cart
exports.deleteUserCart = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.cart = [];

  await user.save();

  res.status(200).send({
    success: true,
    message: "Cart Deleted Successfully..!",
  });
});

//Update User Cart Quantity 

exports.updateUSerCartQty = catchAsyncError(async (req, res, next) => {
  const userID = req.params.id
  const { cart } = req.body

  console.log(userID);
  console.log(cart);

  await User.findByIdAndUpdate(userID,
    { $set: { cart: cart } },
    { new: true, runValidators: true }
  )




  res.status(200).send({
    success: true,
    message: "Cart updated successfully!",
  });
});