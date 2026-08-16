const Cart = require("../products/Cart");
const Product = require("../products/Product");

// Get user's cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    // Create empty cart if user doesn't have one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get cart",
      error: error.message
    });
  }
};

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const requestedQuantity = quantity || 1;

    if (requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    if (product.stock < requestedQuantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available"
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + requestedQuantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Not enough stock available"
        });
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: requestedQuantity
      });
    }

    await cart.save();

    cart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
      error: error.message
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required"
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available"
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product is not in the cart"
      });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message
    });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Product is not in the cart"
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
      error: error.message
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};