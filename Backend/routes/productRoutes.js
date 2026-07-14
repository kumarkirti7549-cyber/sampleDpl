const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getSingleProduct,
} = require("../controllers/productController");

router.post("/", addProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

module.exports = router;