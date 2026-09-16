const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        name: String,
        category: String,
        quantity: Number,
        amount: Number,
        image: String,
      },
    ],

    customer: {
      name: String,
      address: String,
      phone: String,
    },

    total: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);