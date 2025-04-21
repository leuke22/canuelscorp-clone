import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity =
        Number(cart.items[existingItemIndex].quantity) + Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    cart = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "name description image",
    });

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.log("Error in addToCart controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product",
      select: "name description image",
    });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in getCart controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    cart = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "name description image",
    });

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.log("Error in updateCartItem controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (cart.user.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "Cannot remove items from another user's cart",
      });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({
        error: "Cart is already empty",
      });
    }

    const itemExists = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({
        error: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "name description image",
    });

    res.status(200).json({
      message: "Item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error in removeFromCart controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.log("Error in clearCart controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
