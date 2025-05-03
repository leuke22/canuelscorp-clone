import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState, useRef } from "react";
import {
  AddProduct,
  EditProduct,
  AdminProductCard,
  AdminProductsTable,
} from "../../components";

const Products = () => {
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

  const isDeleteDisabled = selectedProducts.length === 0;

  return (
    <section className="flex flex-col md:h-screen w-full bg-gray-100 p-4 md:p-10">
      <div className="flex flex-col md:flex-row items-center justify-between py-5 gap-5">
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

      <AddProduct />

      <EditProduct
        editDialogRef={editDialogRef}
        editProductId={editProductId}
        editName={editName}
        editDescription={editDescription}
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
          <AdminProductsTable
            products={products}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            selectedProducts={selectedProducts}
            handleSelectProduct={handleSelectProduct}
            handleEditClick={handleEditClick}
          />
        </div>
        <div className="md:hidden space-y-4 px-4 py-2 overflow-y-auto h-auto">
          {products.map((product) => (
            <AdminProductCard
              product={product}
              key={product.id}
              selectedProducts={selectedProducts}
              handleSelectProduct={handleSelectProduct}
              handleEditClick={handleEditClick}
            />
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
