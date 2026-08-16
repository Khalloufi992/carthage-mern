const Order = require("../products/Order");
const Cart = require("../products/Cart");
const Product = require("../products/Product");

// Create a new order from the user's cart
const createOrder = async (req, res) => {
  try {
    const {
      fullName,
      address,
      city,
      postalCode,
      country,
      phone,
      paymentMethod
    } = req.body;

    // Validate shipping information
    if (
      !fullName ||
      !address ||
      !city ||
      !postalCode ||
      !country ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete shipping information"
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    // Check stock and prepare order items
    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "A product in your cart no longer exists"
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });

      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress: {
        fullName,
        address,
        city,
        postalCode,
        country,
        phone
      },
      paymentMethod: paymentMethod || "cash_on_delivery",
      paymentStatus: "pending",
      orderStatus: "pending"
    });

    // Reduce product stock
    for (const item of cart.items) {
      const product = item.product;

      await Product.findByIdAndUpdate(product._id, {
        $inc: {
          stock: -item.quantity
        }
      });
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    // Return created order
    const createdOrder = await Order.findById(order._id).populate(
      "items.product"
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: createdOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  }
};

// Get user's order history
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    })
      .populate("items.product")
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message
    });
  }
};

// Get a single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get order",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById
};