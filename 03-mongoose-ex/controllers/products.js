import Product from "../models/product.js";
import asyncWrapper from "../../02-express-ex/middleware/async.js";

const getAllProductsStatic = asyncWrapper(async (req, res) => {
  const products = await Product.find({ featured: true });
  res.status(201).json({ products, products_amout: products.length });
});

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fileds, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [filed, operator, value] = item.split("-");
      if (options.includes(filed)) {
        queryObject[filed] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }

  if (fileds) {
    const filedsList = fileds.split(",").join(" ");
    result = result.select(filedsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(201).json({ products, products_amout: products.length });
};

const productsController = {
  getAllProducts,
  getAllProductsStatic,
};

export default productsController;
