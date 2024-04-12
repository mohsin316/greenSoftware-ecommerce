const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { verifyJWT } = require("../middleware/verifyJWT");
const { verifyAdmin } = require("../middleware/verifyAdmin");

const {
  getProducts,
  postImage,
  postOrder,
  getOrder,
  postProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");

// GET all products
router.get("/getAllproducts", getAllProducts);

// GET all products by category
router.get("/category/:category", getProducts);

// POST new image
router.post("/postImage", upload.single("image"), postImage);

// POST new product
router.route("/postProduct").post(verifyJWT, verifyAdmin, postProduct);

// DELETE a product
router.route("/deleteProduct").delete(verifyJWT, verifyAdmin, deleteProduct);

// UPDATE a product
router.route("/updateProduct/:id").put(verifyJWT, verifyAdmin, updateProduct);

// POST new order
router.route("/checkout").post(verifyJWT, postOrder);

// GET all orders
router.route("/orders/:id").get(verifyJWT, getOrder);

module.exports = router;
