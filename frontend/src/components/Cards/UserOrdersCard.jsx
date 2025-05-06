const UserOrdersCard = ({ order, setSelectedOrder }) => {
  return (
    <div className="card bg-base-100 shadow-sm ">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{order.id}</h2>
          <div
            className={`badge p-3 ${
              order.status === "Processing"
                ? "badge-outline badge-warning"
                : order.status === "Shipped"
                ? "badge-outline badge-info"
                : order.status === "Delivered"
                ? "badge-outline badge-success"
                : order.status === "Cancelled"
                ? "badge-outline badge-error"
                : "badge-outline"
            }`}
          >
            {order.status}
          </div>
        </div>
        <div className="py-2">
          <p className="text-sm font-medium">Date</p>
          <p>{order.date}</p>
        </div>
        <div className="card-actions justify-between">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => setSelectedOrder(order)}
          >
            Check Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersCard;
