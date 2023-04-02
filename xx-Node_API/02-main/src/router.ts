import express from "express";
import { body } from "express-validator";
import { inputErrorHandler } from "./modules/errorMiddleware";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./controllers/product";
import { createUpdate, deleteUpdate, getAllUpdates, getUpdate, updateUpdate } from "./controllers/update";

const router = express.Router();

/**
 * Product
 */
router.get("/product", getAllProducts);
router.get("/product/:id", getProduct);
router.put("/product/:id", body("name").isString(), inputErrorHandler, updateProduct);
router.post("/product", body("name").isString(), inputErrorHandler, createProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getAllUpdates);
router.get("/update/:id", getUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

// Update Point
router.get("/updatepoint");
router.get("/updatepoint/:id");
router.post("/updatepoint");
router.put("/updatepoint/:id");
router.delete("/updatepoint/:id");

export default router;
