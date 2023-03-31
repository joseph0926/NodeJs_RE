import express from "express";
import { body } from "express-validator";
import { inputErrorHandler } from "./modules/errorMiddleware";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./controllers/product";

const router = express.Router();

// Product Routes
router.get("/product", getAllProducts);
router.get("/product/:id", getProduct);
router.post("/product", body("name").isString(), inputErrorHandler, createProduct);
router.put("/product/:id", body("name").isString(), inputErrorHandler, updateProduct);
router.delete("/product/:id");

// Update Routes
router.get("/update");
router.get("/update/:id");
router.post("/update");
router.put("/update/:id", body("title").optional, body("body").optional);
router.delete("/update/:id");

// Update Point
router.get("/updatepoint");
router.get("/updatepoint/:id");
router.post("/updatepoint");
router.put("/updatepoint/:id");
router.delete("/updatepoint/:id");

export default router;
