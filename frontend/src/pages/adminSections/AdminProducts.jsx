import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState, useRef } from "react";
import AddProduct from "../../components/Modal/AddProduct";
import EditProduct from "../../components/Modal/EditProduct";

const Products = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [editProductId, setEditProductId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImagePreview, setEditImagePreview] = useState(null);
  const editDialogRef = useRef(null);

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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
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

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId))
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    else setSelectedProducts([...selectedProducts, productId]);
  };
  const handleSelectAll = () => {
    if (selectAll) setSelectedProducts([]);
    else setSelectedProducts(products.map((p) => p.id));
    setSelectAll(!selectAll);
  };
  const handleDeleteSelected = () => {
    if (!selectedProducts.length) return;
    setProducts(products.filter((p) => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditImagePreview(product.image);
    editDialogRef.current.showModal();
  };
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts(
      products.map((p) =>
        p.id === editProductId
          ? {
              ...p,
              name: editName,
              description: editDescription,
              image: editImagePreview,
            }
          : p
      )
    );
    editDialogRef.current.close();
  };

  const isDeleteDisabled = selectedProducts.length === 0;

  return (
    <section className="flex flex-col h-screen w-full bg-gray-100 p-10">
      <div className="flex justify-between py-5">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-error"
            onClick={handleDeleteSelected}
            disabled={isDeleteDisabled}
          >
            <MdDelete size={20} /> Delete
            {selectedProducts.length ? ` (${selectedProducts.length})` : ""}
          </button>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <IoMdAdd size={25} /> Add Product
          </button>
        </div>
      </div>

      <AddProduct
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        productName={productName}
        setProductName={setProductName}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        imagePreview={imagePreview}
      />

      <EditProduct
        editDialogRef={editDialogRef}
        handleEditSubmit={handleEditSubmit}
        handleEditImageChange={handleEditImageChange}
        editProductId={editProductId}
        editName={editName}
        setEditName={setEditName}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editImagePreview={editImagePreview}
      />

      <div className="bg-gray-100 md:bg-base-100 md:rounded-box md:shadow-md flex-1 flex flex-col">
        <div className="flex-none">
          <div className="flex flex-col md:flex-row justify-between items-center px-10 py-5 gap-5">
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
        <div className="overflow-x-auto flex-1 pl-10 pr-5 hidden md:block">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
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
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </th>
                  <td>{product.id}</td>
                  <td className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt="Product" />
                      </div>
                    </div>
                    <span className="font-semibold text-xl">
                      {product.name}
                    </span>
                  </td>
                  <td className="text-gray-500">{product.description}</td>
                  <td>
                    <button
                      className="btn btn-square btn-soft btn-secondary"
                      onClick={() => handleEditClick(product)}
                    >
                      <FaEdit size={25} />
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
              key={product.id}
              className={`card card-side bg-base-100 shadow-sm relative ${
                selectedProducts.includes(product.id)
                  ? "border-2 border-info"
                  : ""
              }`}
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
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaEdit size={18} /> Edit
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
