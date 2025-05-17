import Order from "../models/orders.model.js";
import Cart from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name description image",
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { shippingAddress } = cart;
    if (
      !shippingAddress ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.province ||
      !shippingAddress.postalCode
    ) {
      return res.status(400).json({
        message:
          "Please complete your shipping address before placing the order",
      });
    }

    const newOrder = new Order({
      user: userId,
      items: cart.items,
      status: "Pending",
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        province: shippingAddress.province,
        postalCode: shippingAddress.postalCode,
      },
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ user: userId });

    const populatedOrder = await Order.findById(newOrder._id).populate({
      path: "items.product",
      select: "name description image",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({
      message: error.message || "Failed to place order",
    });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "username email fullname",
      })
      .populate({
        path: "items.product",
        select: "name description image",
      });

    const { status } = req.query;
    let filteredOrders = orders;

    if (status) {
      filteredOrders = orders.filter((order) => order.status === status);
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      count: filteredOrders.length,
      order: filteredOrders,
    });
  } catch (error) {
    console.log("Error in getUserOrder controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid status. Must be Pending, Shipped, Delivered, or Cancelled",
    });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("Error in updateOrderStatus controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteOrder controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
