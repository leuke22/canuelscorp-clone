import { MdDelete } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { useState } from "react";

const Orders = () => {
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      name: "John Doe",
      date: "2025-04-25",
      status: "Delivered",
      items: [
        { id: "P-01", product: "Fresh Whole Chicken - 1kg", quantity: 2 },
        { id: "P-02", product: "Organic Eggs - 12pcs", quantity: 1 },
      ],
    },
    {
      id: "ORD-002",
      name: "Jane Doe",
      date: "2025-04-22",
      status: "Processing",
      items: [{ id: "P-03", product: "Dio Lupa Coffee Beans", quantity: 1 }],
    },
    // ... more orders
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleDeleteOrder = () => {
    if (!selectedOrderId) {
      alert("Please select an order to delete");
      return;
    }

    console.log(`Deleting order: ${selectedOrderId}`);

    setSelectedOrderId("");
  };

  return (
    <section className="flex flex-col h-screen w-full bg-gray-100 p-10">
      <div className="flex flex-row justify-between py-5">
        <h1 className="text-3xl font-bold">Orders</h1>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <FaHistory size={25} />
          <span className="ml-2">Orders History</span>
        </button>

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
                  {/* head */}
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
      </div>

      <div className="bg-base-100 rounded-box shadow-md h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex-none">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center px-10 py-5">
            <p className="text-xl font-bold text-gray-700">
              All ordered list:{" "}
              <span className="text-xl text-gray-400">{orders.length}</span>
            </p>
            <div>
              <label className="input lg:w-64">
                <svg
                  className="h-4 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" required placeholder="Search" />
              </label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto flex-1 pl-10 pr-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="checkbox checkbox-info" />
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
                <tr key={order.id}>
                  <th>
                    <input type="checkbox" className="checkbox checkbox-info" />
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
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dialog
          id="order_modal"
          className={`modal ${selectedOrder ? "modal-open" : ""}`}
        >
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">
              Order Details: {selectedOrder?.id}
            </h3>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.items.map((item) => (
                  <tr key={item.id}>
                    <td className="tabular-nums font-medium">{item.id}</td>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default Orders;
