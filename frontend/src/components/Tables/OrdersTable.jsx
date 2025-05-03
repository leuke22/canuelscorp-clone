const OrdersTable = ({
  orders,
  selectAll,
  handleSelectAll,
  selectedOrders,
  handleSelectOrder,
  setSelectedOrder,
  handleStatusChange,
}) => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              className="checkbox checkbox-info"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          <th>Order ID</th>
          <th>Customer Name</th>
          <th>Date</th>
          <th>Check Order</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.id}
            className={selectedOrders.includes(order.id) ? "bg-base-200" : ""}
          >
            <th>
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                checked={selectedOrders.includes(order.id)}
                onChange={() => handleSelectOrder(order.id)}
              />
            </th>
            <td className="tabular-nums font-medium">{order.id}</td>
            <td>{order.name}</td>
            <td>{order.date}</td>
            <td>
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={() => setSelectedOrder(order)}
              >
                Check Order
              </button>
            </td>
            <td>
              <select
                className="select select-bordered select-sm w-full"
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </td>
            <td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
