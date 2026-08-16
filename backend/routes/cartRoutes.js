const express = require("express");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get user's cart
router.get("/", protect, getCart);

// Add product to cart
router.post("/", protect, addToCart);

// Update product quantity
router.put("/", protect, updateCartItem);

// Remove product from cart
router.delete("/:productId", protect, removeFromCart);

// Clear cart
router.delete("/", protect, clearCart);

module.exports = router;