import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const Products = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ productName, productDescription, imagePreview });

    setProductName("");
    setProductDescription("");
    setImagePreview(null);
  };

  const [products, setProducts] = useState([
    {
      id: "01",
      name: "Dio Lupa",
      description: "Fresh Whole Chicken - 1kg",
      image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    },
    {
      id: "02",
      name: "Fresh Vegetables",
      description: "Organic Mixed Vegetables Pack",
      image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    },
    {
      id: "03",
      name: "Pasta Set",
      description: "Italian Pasta Collection",
      image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    },
  ]);

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) {
      return;
    }

    const remainingProducts = products.filter(
      (product) => !selectedProducts.includes(product.id)
    );

    setProducts(remainingProducts);
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const isDeleteDisabled = selectedProducts.length === 0;

  return (
    <section className="flex flex-col h-screen w-full bg-gray-100 p-10">
      <div className="flex flex-row justify-between py-5">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <IoMdAdd size={25} />
          <span className="mr-2">Add Products</span>
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Create New Product</h3>
            <div className="divider"></div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Product Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <div className="text-sm text-gray-500 mb-1">Preview:</div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-auto object-contain border rounded"
                    />
                  </div>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">
                    Product Description
                  </span>
                </label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Enter product description"
                  className="textarea textarea-bordered w-full h-24"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end mt-6 space-x-2">
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
      </div>

      <div className="bg-gray-100 md:bg-base-100 md:rounded-box md:shadow-md h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex-none">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center px-10 py-5">
            <p className="text-xl font-bold text-gray-700">
              All products list:{" "}
              <span className="text-xl text-gray-400">{products.length}</span>
              {selectedProducts.length > 0 && (
                <span className="text-xl text-secondary">
                  {" "}
                  ({selectedProducts.length} selected)
                </span>
              )}
            </p>
            <div className="flex flex-row gap-5">
              <button
                className={`btn btn-error ${
                  isDeleteDisabled ? "opacity-50" : ""
                }`}
                onClick={handleDeleteSelected}
                disabled={isDeleteDisabled}
              >
                <MdDelete size={20} />
                <span>
                  Delete
                  {selectedProducts.length > 0
                    ? ` (${selectedProducts.length})`
                    : ""}
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
        </div>

        <div className="overflow-x-auto flex-1 pl-10 pr-5 hidden md:block">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </label>
                </th>
                <th>ID</th>
                <th>Product</th>
                <th>Description</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={
                    selectedProducts.includes(product.id) ? "bg-base-200" : ""
                  }
                >
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="font-thin opacity-30 tabular-nums text-3xl">
                      {product.id}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.image} alt="Product image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-xl">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-500">{product.description}</td>
                  <td>
                    <button className="btn btn-square btn-soft btn-secondary">
                      <FaEdit size={25} className="pl-0.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 px-4 py-2 overflow-y-auto">
          {products.map((product) => (
            <div
              className={`card card-side bg-base-100 shadow-sm relative ${
                selectedProducts.includes(product.id)
                  ? "border-2 border-info"
                  : ""
              }`}
              key={product.id}
            >
              <div className="flex flex-col gap-2">
                <div className="p-4 pb-0">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </div>
                <figure className="pl-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </figure>
              </div>

              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end pb-2">
                  <button className="btn btn-secondary">
                    <FaEdit size={18} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
