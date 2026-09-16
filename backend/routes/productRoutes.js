const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, adminOnly, addProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
module.exports = router;