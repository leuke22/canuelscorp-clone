import { MdDelete } from "react-icons/md";
import { useOrder } from "../fetch/useOrder";
import { useState } from "react";
import { DeleteConfirmation } from "../components";

const OrderTableHeader = ({
  orders,
  selectedOrders,
  setSelectedOrders,
  setSelectAll,
  searchQuery,
  setSearchQuery,
}) => {
  const { deleteOrders, isLoading } = useOrder();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleBulkDelete = async () => {
    if (selectedOrders.length === 0) return;
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteOrders(selectedOrders);
      setSelectedOrders([]);
      setSelectAll(false);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to delete orders:", error);
    }
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
          onClick={handleBulkDelete}
          disabled={isDeleteDisabled}
        >
          <MdDelete size={20} />
          <span>
            Delete
            {selectedOrders.length > 0 ? ` (${selectedOrders.length})` : ""}
          </span>
        </button>

        <DeleteConfirmation
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          selectedOrders={selectedOrders}
          confirmDelete={confirmDelete}
          sectionName="order"
          isLoading={isLoading}
        />

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
          <input
            type="search"
            placeholder="Search by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
};

export default OrderTableHeader;
