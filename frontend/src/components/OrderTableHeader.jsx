import { MdDelete } from "react-icons/md";

const OrderTableHeader = ({
  orders,
  selectedOrders,
  setOrders,
  setSelectedOrders,
  setSelectAll,
}) => {
  const handleDeleteSelected = () => {
    if (selectedOrders.length === 0) {
      return;
    }

    const remainingOrders = orders.filter(
      (order) => !selectedOrders.includes(order.id)
    );

    setOrders(remainingOrders);
    setSelectedOrders([]);
    setSelectAll(false);
  };

  const isDeleteDisabled = selectedOrders.length === 0;

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between items-center px-10 py-5">
      <p className="text-xl font-bold text-gray-700">
        All ordered list:{" "}
        <span className="text-xl text-gray-400">{orders.length}</span>
        {selectedOrders.length > 0 && (
          <span className="text-xl text-secondary">
            {" "}
            ({selectedOrders.length} selected)
          </span>
        )}
      </p>
      <div className="flex flex-row gap-5">
        <button
          className={`btn btn-error ${isDeleteDisabled ? "opacity-50" : ""}`}
          onClick={handleDeleteSelected}
          disabled={isDeleteDisabled}
        >
          <MdDelete size={20} />
          <span>
            Delete
            {selectedOrders.length > 0 ? ` (${selectedOrders.length})` : ""}
          </span>
        </button>
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
          <input type="search" placeholder="Search" />
        </label>
      </div>
    </div>
  );
};

export default OrderTableHeader;
