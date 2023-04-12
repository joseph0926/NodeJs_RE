const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);

router.post("/uploads", uploadProductImage);

module.exports = router;
