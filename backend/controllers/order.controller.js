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
