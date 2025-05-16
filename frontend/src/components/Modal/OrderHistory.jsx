import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useOrder } from "../../fetch/useOrder";
import { toast } from "react-hot-toast";
import DeleteConfirmation from "./DeleteConfirmation";

const OrderHistory = ({ isOpen, setIsOpen }) => {
  const { orders, deleteOrders, isFetchLoading } = useOrder();
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const completedOrders =
    orders?.filter(
      (order) => order.status === "Delivered" || order.status === "Cancelled"
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

  const handleDeleteClick = () => {
    if (!selectedOrderId) {
      toast.error("Please select an order to delete");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteOrders([selectedOrderId]);
      setSelectedOrderId("");
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedOrderId("");
  };

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Orders History</h3>
        <div className="divider" />

        {isFetchLoading ? (
          <tr key="loading">
            <td colSpan="7">
              <span className="loading loading-spinner loading-xs"></span>
            </td>
          </tr>
        ) : completedOrders?.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">
              No delivered or cancelled orders found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedOrders?.map((order) => (
                  <tr
                    key={order._id}
                    className={`hover ${
                      selectedOrderId === order._id ? "bg-primary/20" : ""
                    }`}
                    onClick={() => setSelectedOrderId(order._id)}
                  >
                    <th>
                      <input
                        type="radio"
                        name="selectedOrder"
                        className="radio radio-sm"
                        checked={selectedOrderId === order._id}
                        onChange={() => setSelectedOrderId(order._id)}
                      />
                    </th>
                    <td>{order._id}</td>
                    <td>{order.user.fullname}</td>
                    <td>{formatDateTime(order.createdAt)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-6 space-x-2">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={handleDeleteClick}
            disabled={!selectedOrderId}
          >
            <MdDelete className="mr-1" /> Delete Order
          </button>

          <DeleteConfirmation
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            selectedOrders={[selectedOrderId]}
            confirmDelete={confirmDelete}
            sectionName="order"
          />
        </div>
      </div>
    </dialog>
  );
};

export default OrderHistory;
