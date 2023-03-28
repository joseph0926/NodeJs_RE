import express from "express";
import productsController from "../controllers/products.js";

const { getAllProducts, getAllProductsStatic } = productsController;

export const router = express.Router();

router.get("/", getAllProducts);
router.get("/static", getAllProductsStatic);
