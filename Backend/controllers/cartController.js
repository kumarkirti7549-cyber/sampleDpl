 const Cart = require("../models/Cart");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });

      return res.status(201).json({
        message: "Product Added To Cart",
        cart,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Cart Updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Quantity
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product Not Found In Cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Quantity Updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Product
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product Removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};