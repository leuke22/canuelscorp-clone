import { FaHistory } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  OrderHistory,
  OrderTableHeader,
  CheckOrder,
  OrderCard,
  OrdersTable,
} from "../../components";
import { useOrder } from "../../fetch/useOrder";

const Orders = () => {
  const { orders = [], getOrders, updateOrderStatus } = useOrder();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCheckOrderOpen, setIsCheckOrderOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await getOrders();
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, [getOrders]);

  if (!Array.isArray(orders)) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order._id.toLowerCase().includes(query) ||
      order.user.fullname.toLowerCase().includes(query)
    );
  });

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
      setSelectedOrders(orders.map((order) => order._id));
    }
    setSelectAll(!selectAll);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsCheckOrderOpen(true);
  };

  return (
    <section className="flex flex-col h-screen w-full bg-gray-100 p-10">
      <div className="flex flex-row justify-between py-5">
        <h1 className="text-3xl font-bold">Orders</h1>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => setIsHistoryOpen(true)}
        >
          <FaHistory size={25} />
          <span className="ml-2">Orders History</span>
        </button>

        <OrderHistory isOpen={isHistoryOpen} setIsOpen={setIsHistoryOpen} />
      </div>

      <div className="bg-gray-100 md:bg-base-100 md:rounded-box md:shadow-md h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex-none">
          <OrderTableHeader
            orders={filteredOrders}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            setSelectAll={setSelectAll}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="overflow-x-auto flex-1 pl-10 pr-5 hidden md:block">
          <OrdersTable
            orders={filteredOrders}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            selectedOrders={selectedOrders}
            handleSelectOrder={handleSelectOrder}
            setSelectedOrder={handleOpenOrderDetails}
            handleStatusChange={handleStatusChange}
          />
        </div>

        <div className="md:hidden space-y-4 px-4 py-2 overflow-y-auto">
          {filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                selectedOrders={selectedOrders}
                handleSelectOrder={handleSelectOrder}
                setSelectedOrder={handleOpenOrderDetails}
                handleStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchQuery
                ? "No orders found matching your search"
                : "No orders available"}
            </div>
          )}
        </div>

        <CheckOrder
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          isOpen={isCheckOrderOpen}
          setIsOpen={setIsCheckOrderOpen}
        />
      </div>
    </section>
  );
};

export default Orders;
