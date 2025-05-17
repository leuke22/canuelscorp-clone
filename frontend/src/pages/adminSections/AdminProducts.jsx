import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import {
  AddProduct,
  EditProduct,
  AdminProductCard,
  AdminProductsTable,
  DeleteConfirmation,
} from "../../components";
import { useProducts } from "../../fetch/useProducts";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [editProductId, setEditProductId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImagePreview, setEditImagePreview] = useState(null);
  const editDialogRef = useRef(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [categoryTable, setCategoryTable] = useState("All");

  const {
    products,
    isFetchLoading,
    getProducts,
    deleteProduct,
    isDeleteLoading,
    getCategory,
  } = useProducts();

  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    if (categoryTable === "All") {
      getProducts();
    } else {
      getCategory(categoryTable);
    }
  }, [categoryTable, getProducts, getCategory]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId))
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    else setSelectedProducts([...selectedProducts, productId]);
  };

  const handleSelectAll = () => {
    if (selectAll) setSelectedProducts([]);
    else setSelectedProducts(products.map((prod) => prod._id));
    setSelectAll(!selectAll);
  };

  const handleDeleteClick = () => {
    if (!selectedProducts.length) return;
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedProducts);
      setSelectedProducts([]);
      setSelectAll(false);
      setShowConfirmModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to delete products");
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditName(product.name);
    setEditCategory(product.category);
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
            onClick={handleDeleteClick}
            disabled={isDeleteDisabled}
          >
            <MdDelete size={20} />
            {isDeleteLoading ? "Deleting..." : "Delete"}
            {isDeleteLoading && (
              <span className="loading loading-spinner"></span>
            )}
            {selectedProducts.length ? ` (${selectedProducts.length})` : ""}
          </button>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <IoMdAdd size={25} /> Add Product
          </button>

          <DeleteConfirmation
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            selectedOrders={selectedProducts}
            confirmDelete={confirmDelete}
            sectionName="product"
            isLoading={isDeleteLoading}
          />
        </div>
      </div>

      <AddProduct />

      <EditProduct
        editDialogRef={editDialogRef}
        editProductId={editProductId}
        setEditProductId={setEditProductId}
        editName={editName}
        setEditName={setEditName}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editImagePreview={editImagePreview}
        setEditImagePreview={setEditImagePreview}
      />

      <div className="bg-gray-100 md:bg-base-100 md:rounded-box md:shadow-md flex-1 flex flex-col">
        <div className="flex-none">
          <div className="flex flex-col md:flex-row justify-between items-center px-10 py-5 gap-5">
            <p className="text-xl font-bold text-gray-700">
              All products list:{" "}
              <span className="text-xl text-gray-400">
                {filteredProducts.length}
              </span>
              {selectedProducts.length > 0 && (
                <span className="text-xl text-secondary">
                  {" "}
                  ({selectedProducts.length} selected)
                </span>
              )}
            </p>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <div className="form-control w-28 md:w-40">
                <select
                  value={categoryTable}
                  onChange={(e) => setCategoryTable(e.target.value)}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Select Category...
                  </option>
                  <option value="All">All</option>
                  <option value="Pork">Pork</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Beef">Beef</option>
                </select>
              </div>
              <label className="input w-56 lg:w-64 ">
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
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full focus:outline-none"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto flex-1 pl-10 pr-5 hidden md:block">
          {isFetchLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : (
            <AdminProductsTable
              products={filteredProducts}
              selectAll={selectAll}
              handleSelectAll={handleSelectAll}
              selectedProducts={selectedProducts}
              handleSelectProduct={handleSelectProduct}
              handleEditClick={handleEditClick}
            />
          )}
        </div>
        <div className="md:hidden space-y-4 px-4 py-2 overflow-y-auto h-auto">
          {isFetchLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner"></span>
            </div>
          ) : (
            <>
              {filteredProducts.map((product) => (
                <AdminProductCard
                  product={product}
                  key={product._id}
                  selectedProducts={selectedProducts}
                  handleSelectProduct={handleSelectProduct}
                  handleEditClick={handleEditClick}
                />
              ))}
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery
                    ? "No products found matching your search"
                    : "No products available"}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
