const EditProduct = ({
  editDialogRef,
  handleEditSubmit,
  handleEditImageChange,
  editProductId,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  editImagePreview,
}) => {
  return (
    <dialog ref={editDialogRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit Product</h3>
        <div className="divider" />
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">ID</span>
            </label>
            <input
              type="text"
              value={editProductId || ""}
              disabled
              className="input input-bordered w-full bg-gray-200"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              className="file-input file-input-bordered w-full"
            />
            {editImagePreview && (
              <img
                src={editImagePreview}
                alt="Edit Preview"
                className="h-32 w-auto object-contain border rounded mt-2"
              />
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="textarea textarea-bordered w-full h-24"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="btn btn-outline btn-error"
              onClick={() => editDialogRef.current.close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProduct;
