const CheckOrder = ({ selectedOrder, setSelectedOrder, isOpen, setIsOpen }) => {
  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Order Details</h3>

        {selectedOrder ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder?.items?.map((item) => (
                    <tr key={item._id || item.id}>
                      <td>{item._id || item.id}</td>
                      <td>{item.product?.name || "Unknown Product"}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Shipping Address</h4>
              <p>
                {selectedOrder?.shippingAddress?.street},{" "}
                {selectedOrder?.shippingAddress?.city},{" "}
                {selectedOrder?.shippingAddress?.province},{" "}
                {selectedOrder?.shippingAddress?.postalCode}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Status</h4>
              <p>{selectedOrder?.status}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">User Information</h4>
              <p>
                {selectedOrder?.user?.fullname || "Unknown"} (
                {selectedOrder?.user?.email || "No email"})
              </p>
            </div>
          </>
        ) : (
          <p>No order selected or order history will be displayed here.</p>
        )}

        <div className="modal-action">
          <button
            className="btn"
            onClick={() => {
              setIsOpen(false);
              if (selectedOrder) setSelectedOrder(null);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CheckOrder;
