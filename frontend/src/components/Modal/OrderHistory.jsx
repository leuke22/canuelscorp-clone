import { MdDelete } from "react-icons/md";
import { useState } from "react";
const OrderHistory = ({ orders, setOrders }) => {
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const handleDeleteOrder = () => {
    if (!selectedOrderId) {
      alert("Please select an order to delete");
      return;
    }

    console.log(`Deleting order: ${selectedOrderId}`);

    setOrders(orders.filter((order) => order.id !== selectedOrderId));
    setSelectedOrderId("");
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Orders History</h3>
        <div className="divider" />

        {orders.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No orders found</p>
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
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`hover ${
                      selectedOrderId === order.id ? "bg-primary/20" : ""
                    }`}
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <th>
                      <input
                        type="radio"
                        name="selectedOrder"
                        className="radio radio-sm"
                        checked={selectedOrderId === order.id}
                        onChange={() => setSelectedOrderId(order.id)}
                      />
                    </th>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.date}</td>
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
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={handleDeleteOrder}
            disabled={!selectedOrderId}
          >
            <MdDelete className="mr-1" /> Delete Order
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default OrderHistory;
