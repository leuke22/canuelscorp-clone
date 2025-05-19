const CheckOrder = ({ selectedOrder, setSelectedOrder, isOpen, setIsOpen }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  if (!selectedOrder) return null;

  return (
    <dialog
      id="check_order_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg mb-4">
          Order Details #{selectedOrder?._id.substring(0, 8)}
        </h3>

        {selectedOrder ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Status:</span>
              <div
                className={`badge p-3 ${
                  selectedOrder.status === "Pending"
                    ? "badge-warning badge-outline"
                    : selectedOrder.status === "Shipped"
                    ? "badge-info badge-outline"
                    : selectedOrder.status === "Delivered"
                    ? "badge-success badge-outline"
                    : "badge-error badge-outline"
                }`}
              >
                {selectedOrder.status}
              </div>
            </div>

            <div>
              <span className="font-medium">Order Date:</span>
              <p>{formatDate(selectedOrder.createdAt)}</p>
            </div>

            <div>
              <span className="font-medium">Shipping Address:</span>
              <p>
                {selectedOrder.shippingAddress.street},{" "}
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.province},{" "}
                {selectedOrder.shippingAddress.postalCode}
              </p>
            </div>

            <div>
              <span className="font-medium">Items:</span>
              <div className="overflow-x-auto mt-2">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Details</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item) => (
                      <tr key={item._id}>
                        <td className="font-mono text-sm">
                          {item.product._id.substring(0, 8)}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            {item.product.image && (
                              <div className="avatar">
                                <div className="w-12 h-12">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                  />
                                </div>
                              </div>
                            )}
                            <div>
                              <div className="font-bold">
                                {item.product.name}
                              </div>
                              <div className="text-sm opacity-50">
                                {item.product.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p>No order selected</p>
        )}

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default CheckOrder;
