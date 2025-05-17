import { useState } from "react";

const OrderCard = ({
  order,
  selectedOrders,
  handleSelectOrder,
  setSelectedOrder,
  handleStatusChange,
}) => {
  const [pendingChanges, setPendingChanges] = useState({});
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
    <div
      className={`card bg-base-100 shadow-sm ${
        selectedOrders.includes(order._id) ? "border-2 border-info" : ""
      }`}
      key={order._id}
    >
      <div className="p-4 pb-0">
        <input
          type="checkbox"
          className="checkbox checkbox-info"
          checked={selectedOrders.includes(order._id)}
          onChange={() => handleSelectOrder(order._id)}
        />
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-2">
          <h2 className="card-title">{order._id}</h2>
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
            <p className="text-lg">{order.user.fullname}</p>
          </div>
          <div className="py-2">
            <p className="text-sm font-medium">Date</p>
            <p>{formatDateTime(order.createdAt)}</p>
          </div>
        </div>
        <div className="card-actions justify-between">
          <select
            className="select select-bordered select-sm"
            value={pendingChanges[order._id] || order.status}
            onChange={(e) => initiateStatusChange(order._id, e.target.value)}
          >
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
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
