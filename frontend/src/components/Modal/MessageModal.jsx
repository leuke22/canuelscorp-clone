const MessageModal = ({ isOpen, setIsOpen, message }) => {
  return (
    <dialog
      id="message_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Customer Message</h3>
        <p className="py-4 whitespace-pre-wrap">{message}</p>
        <div className="modal-action">
          <button className="btn" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsOpen(false)}>close</button>
      </form>
    </dialog>
  );
};

export default MessageModal;
