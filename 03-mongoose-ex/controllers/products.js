const getAllProductsStatic = async (req, res) => {
  res.status(201).json({ message: "test" });
};

const getAllProducts = async (req, res) => {
  res.status(201).json({ message: "get all products" });
};

const productsController = {
  getAllProducts,
  getAllProductsStatic,
};

export default productsController;
