const app = require("./app");
const path = require("path");
const connectDatabase = require("./config/database");
const Product = require('./models/productModel');

connectDatabase().then(async() => {
  const productCount = await Product.countDocuments();
  console.log(`📦 Total products in DB: ${productCount}`);
})

const server = app.listen(process.env.PORT, () => {
  console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(err);
  console.log("Shutting down the server due to unhandled rejection error");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");
  server.close(() => {
    process.exit(1);
  });
});
