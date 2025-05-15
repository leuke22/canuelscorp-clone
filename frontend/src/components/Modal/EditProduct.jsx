import { useProducts } from "../../fetch/useProducts";

const EditProduct = ({
  editDialogRef,
  editProductId,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  editImagePreview,
  setEditImagePreview,
  editCategory,
  setEditCategory,
}) => {
  const { updateProduct, isLoading } = useProducts();

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(
        editProductId,
        editImagePreview,
        editName,
        editCategory,
        editDescription
      );
      editDialogRef.current.close();
    } catch (error) {
      toast.error(error);
    }
  };

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
              <span className="label-text">Category</span>
            </label>
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select Category...
              </option>
              <option value="Pork">Pork</option>
              <option value="Chicken">Chicken</option>
              <option value="Beef">Beef</option>
            </select>
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
              {isLoading ? "Saving..." : "Save"}
              {isLoading && <span className="loading loading-spinner"></span>}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProduct;
