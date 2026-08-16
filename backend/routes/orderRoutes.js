const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create order from cart
router.post("/", protect, createOrder);

// Get user's order history
router.get("/", protect, getMyOrders);

// Get single order
router.get("/:id", protect, getOrderById);

module.exports = router;