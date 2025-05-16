const DeleteConfirmation = ({
  showConfirmModal,
  setShowConfirmModal,
  selectedOrders,
  confirmDelete,
  sectionName,
}) => {
  return (
    <dialog className={`modal ${showConfirmModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete {selectedOrders.length} selected{" "}
          {selectedOrders.length === 1
            ? sectionName === "order"
              ? "order"
              : sectionName === "product"
              ? "product"
              : sectionName === "user"
              ? "user"
              : "invalid section"
            : sectionName === "order"
            ? "orders"
            : sectionName === "product"
            ? "products"
            : sectionName === "user"
            ? "users"
            : "invalid section"}
          ?
        </p>
        <p className="text-sm text-error">This action cannot be undone.</p>
        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-error" onClick={confirmDelete}>
            Delete
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShowConfirmModal(false)}>close</button>
      </form>
    </dialog>
  );
};

export default DeleteConfirmation;
