require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./utils/db.js');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/auth-routes.js');
const adminProductsRouter = require('./routes/admin/product-routes.js');
const adminOrderRouter = require('./routes/admin/order-routes.js');


const shopProductsRouter = require('./routes/shop/products-routes.js');
const shopCartRouter = require('./routes/shop/cart-routes.js');
const shopAddressRouter = require('./routes/shop/address-routes.js');
const shopOrderRouter = require('./routes/shop/order-routes.js');
const shopSearchRouter = require('./routes/shop/search-routes.js');
const shopReviewRouter = require('./routes/shop/review-route.js');
const rateLimiter = require('express-rate-limit');

connectDb();
const app = express()

const limiter = rateLimiter({
   max: 300,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
})

app.use(limiter);

const PORT  = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());


app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "DELETE", "PUT" , "PATCH"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],

    })
  );
  

  app.use('/api/auth' , authRouter);
  app.use('/api/admin/products' , adminProductsRouter);
  app.use('/api/admin/orders' , adminOrderRouter);


  app.use('/api/shop/products' , shopProductsRouter)
  app.use("/api/shop/cart", shopCartRouter);
  app.use('/api/shop/address' ,shopAddressRouter )
  app.use('/api/shop/order' , shopOrderRouter);
  app.use('/api/shop/search' , shopSearchRouter);
  app.use('/api/shop/review' , shopReviewRouter)

  
  app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));