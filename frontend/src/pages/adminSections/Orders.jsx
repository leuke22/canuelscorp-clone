import { FaHistory } from "react-icons/fa";
import { useState } from "react";
import {
  OrderHistory,
  OrderTableHeader,
  CheckOrder,
  OrderCard,
  OrdersTable,
} from "../../components";

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
    {
      id: "ORD-003",
      name: "Alex Smith",
      date: "2025-04-20",
      status: "Shipped",
      items: [
        { id: "P-04", product: "Organic Apples - 1kg", quantity: 1 },
        { id: "P-05", product: "Fresh Bread", quantity: 2 },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
    setSelectAll(!selectAll);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
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

        <OrderHistory orders={orders} setOrders={setOrders} />
      </div>

      <div className="bg-gray-100 md:bg-base-100 md:rounded-box md:shadow-md h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex-none">
          <OrderTableHeader
            orders={orders}
            selectedOrders={selectedOrders}
            setOrders={setOrders}
            setSelectedOrders={setSelectedOrders}
            setSelectAll={setSelectAll}
          />
        </div>

        <div className="overflow-x-auto flex-1 pl-10 pr-5 hidden md:block">
          <OrdersTable
            orders={orders}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            selectedOrders={selectedOrders}
            handleSelectOrder={handleSelectOrder}
            setSelectedOrder={setSelectedOrder}
            handleStatusChange={handleStatusChange}
          />
        </div>

        <div className="md:hidden space-y-4 px-4 py-2 overflow-y-auto">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              selectedOrders={selectedOrders}
              handleSelectOrder={handleSelectOrder}
              setSelectedOrder={setSelectedOrder}
              handleStatusChange={handleStatusChange}
            />
          ))}

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders available
            </div>
          )}
        </div>

        <CheckOrder
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      </div>
    </section>
  );
};

export default Orders;
