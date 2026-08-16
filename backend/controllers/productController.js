const Product = require("../products/Product");

// Add a new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      stock
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all product fields"
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
};

// Get all products with search and category filter
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = {};

    // Search by product name or description
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    // Filter by category
    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i"
      };
    }

    const products = await Product.find(filter).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: error.message
    });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get product",
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById
};