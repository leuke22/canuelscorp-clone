import Cart from "../models/cart.model.js";

export const getUserOrder = async (req, res) => {
  try {
    const orders = await Cart.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "username email firstName lastName",
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
      success: true,
      count: filteredOrders.length,
      orders: filteredOrders,
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
    const order = await Cart.findById(orderId);

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
    const order = await Cart.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Cart.findByIdAndDelete(orderId);

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
