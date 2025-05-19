const UserOrdersCard = ({ order, setSelectedOrder, setIsOrderModalOpen }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handleCheckOrder = () => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">Order #{order._id.substring(0, 8)}</h2>
          <div
            className={`badge p-3 ${
              order.status === "Pending"
                ? "badge-warning badge-outline"
                : order.status === "Shipped"
                ? "badge-info badge-outline"
                : order.status === "Delivered"
                ? "badge-success badge-outline"
                : "badge-error badge-outline"
            }`}
          >
            {order.status}
          </div>
        </div>

        <div className="py-2">
          <p className="text-sm">
            <span className="font-medium">Order Date: </span>
            {formatDate(order.createdAt)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Items: </span>
            {order.items.length} items
          </p>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-primary" onClick={handleCheckOrder}>
            Check Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersCard;
