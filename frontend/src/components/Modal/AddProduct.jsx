import { useState } from "react";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: String(products.length + 1).padStart(2, "0"),
      name: productName,
      description: productDescription,
      image: imagePreview,
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductDescription("");
    setImagePreview(null);
    document.getElementById("my_modal_3").close();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Create New Product</h3>
        <div className="divider" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="textarea textarea-bordered w-full h-24"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="btn btn-outline btn-error"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddProduct;
