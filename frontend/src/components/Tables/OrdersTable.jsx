import { useOrder } from "../../fetch/useOrder";
import { useState } from "react";

const OrdersTable = ({
  orders,
  selectAll,
  handleSelectAll,
  selectedOrders,
  handleSelectOrder,
  setSelectedOrder,
  handleStatusChange,
}) => {
  const { isFetchLoading } = useOrder();
  const [pendingChanges, setPendingChanges] = useState({});

  const activeOrders =
    orders?.filter(
      (order) => order.status !== "Delivered" && order.status !== "Cancelled"
    ) || [];

  const formatDateTime = (isoString) => {
    const dt = new Date(isoString);
    return dt.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const initiateStatusChange = (orderId, newStatus) => {
    setPendingChanges({
      ...pendingChanges,
      [orderId]: newStatus,
    });
  };

  const confirmStatusChange = (orderId) => {
    handleStatusChange(orderId, pendingChanges[orderId]);
    const updatedChanges = { ...pendingChanges };
    delete updatedChanges[orderId];
    setPendingChanges(updatedChanges);
  };

  const cancelStatusChange = (orderId) => {
    const updatedChanges = { ...pendingChanges };
    delete updatedChanges[orderId];
    setPendingChanges(updatedChanges);
  };

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
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>
        {isFetchLoading ? (
          <tr key="loading">
            <td colSpan="7">
              <span className="loading loading-spinner loading-xs"></span>
            </td>
          </tr>
        ) : activeOrders.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center py-4">
              No active orders available
            </td>
          </tr>
        ) : (
          activeOrders?.map((order) => (
            <tr
              key={order._id}
              className={
                selectedOrders.includes(order._id) ? "bg-base-200" : ""
              }
            >
              <th>
                <input
                  type="checkbox"
                  className="checkbox checkbox-info"
                  checked={selectedOrders.includes(order._id)}
                  onChange={() => handleSelectOrder(order._id)}
                />
              </th>
              <td className="tabular-nums font-medium">{order._id}</td>
              <td>{order.user.fullname}</td>
              <td>{formatDateTime(order.createdAt)}</td>
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
                  value={pendingChanges[order._id] || order.status}
                  onChange={(e) =>
                    initiateStatusChange(order._id, e.target.value)
                  }
                >
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
              <td className="relative">
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

                {pendingChanges[order._id] && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs">
                      Change to{" "}
                      <span className="font-semibold">
                        {pendingChanges[order._id]}
                      </span>
                      ?
                    </span>
                    <div className="flex gap-1">
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => confirmStatusChange(order._id)}
                      >
                        ✓
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => cancelStatusChange(order._id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default OrdersTable;
