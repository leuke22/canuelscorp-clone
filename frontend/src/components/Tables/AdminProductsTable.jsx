import { FaEdit } from "react-icons/fa";

const AdminProductsTable = ({
  products,
  selectAll,
  handleSelectAll,
  selectedProducts,
  handleSelectProduct,
  handleEditClick,
}) => {
  return (
    <div className="overflow-auto h-120 rounded-lg">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="p-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-2">ID</th>
            <th className="p-2">Product</th>
            <th className="p-2">Category</th>
            <th className="p-2">Description</th>
            <th className="p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className={
                selectedProducts.includes(product._id) ? "bg-base-200" : ""
              }
            >
              <th className="p-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info"
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => handleSelectProduct(product._id)}
                />
              </th>
              <td className="p-2 break-all">{product._id}</td>
              <td className="p-2 flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={product.image} alt="Product" />
                  </div>
                </div>
                <span className="font-semibold text-xl truncate">
                  {product.name}
                </span>
              </td>
              <td className="p-2 text-gray-500 truncate">{product.category}</td>
              <td className="p-2 text-gray-500 truncate">
                {product.description}
              </td>
              <td className="p-2">
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
  );
};

export default AdminProductsTable;
