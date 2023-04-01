import express from "express";
import { body } from "express-validator";
import { inputErrorHandler } from "./modules/errorMiddleware";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/product";

const router = express.Router();

/**
 * Product
 */
router.get("/product", getAllProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  inputErrorHandler,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  inputErrorHandler,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update");
router.get("/update/:id");
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional()
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString()
);
router.delete("/update/:id");

// Update Point
router.get("/updatepoint");
router.get("/updatepoint/:id");
router.post("/updatepoint");
router.put("/updatepoint/:id");
router.delete("/updatepoint/:id");

export default router;
