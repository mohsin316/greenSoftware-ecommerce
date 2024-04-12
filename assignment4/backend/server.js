require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

// express app
const app = express();

// cors
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.listen("4500", () => {
  console.log("listening on port 4500");
});
