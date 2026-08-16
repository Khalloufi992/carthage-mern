const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    image: {
      type: String,
      required: true
    }
  },
  {
    _id: false
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "Order must contain at least one product"
      }
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    shippingAddress: {
      fullName: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      postalCode: {
        type: String,
        required: true
      },

      country: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      }
    },

    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "card"],
      default: "cash_on_delivery"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);