const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./utils/db.js');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/auth-routes.js');
const adminProductsRouter = require('./routes/admin/product-routes.js');

connectDb();
const app = express()
const PORT  = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());


app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT" , "PATCH"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );
  

  app.use('/api/auth' , authRouter);
  app.use('/api/admin/products' , adminProductsRouter)

  app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));