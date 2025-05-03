const CheckOrder = ({ selectedOrder, setSelectedOrder }) => {
  return (
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
  );
};

export default CheckOrder;
