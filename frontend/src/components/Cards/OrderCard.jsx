const OrderCard = ({
  order,
  selectedOrders,
  handleSelectOrder,
  setSelectedOrder,
  handleStatusChange,
}) => {
  return (
    <div
      className={`card bg-base-100 shadow-sm ${
        selectedOrders.includes(order.id) ? "border-2 border-info" : ""
      }`}
      key={order.id}
    >
      <div className="p-4 pb-0">
        <input
          type="checkbox"
          className="checkbox checkbox-info"
          checked={selectedOrders.includes(order.id)}
          onChange={() => handleSelectOrder(order.id)}
        />
      </div>
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
        <div className="divide-y">
          <div className="py-2">
            <p className="text-sm font-medium">Customer</p>
            <p className="text-lg">{order.name}</p>
          </div>
          <div className="py-2">
            <p className="text-sm font-medium">Date</p>
            <p>{order.date}</p>
          </div>
        </div>
        <div className="card-actions justify-between">
          <select
            className="select select-bordered select-sm"
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
          >
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
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

export default OrderCard;
