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
              <span className="font-semibold text-xl">{product.name}</span>
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
  );
};

export default AdminProductsTable;
