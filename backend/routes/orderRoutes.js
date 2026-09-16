const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");
router.post("/", protect, createOrder);
router.get("/", protect, adminOnly, getAllOrders);
router.get("/user/:userId", getUserOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder);
module.exports = router;