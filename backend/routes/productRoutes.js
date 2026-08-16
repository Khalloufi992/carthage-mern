const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get one product
router.get("/:id", getProductById);

// Create product
router.post("/", protect, createProduct);

module.exports = router;