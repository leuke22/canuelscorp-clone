import { FaEdit } from "react-icons/fa";
const AdminProductCard = ({
  product,
  selectedProducts,
  handleSelectProduct,
  handleEditClick,
}) => {
  return (
    <div
      key={product.id}
      className={`card card-side bg-base-100 shadow-sm relative ${
        selectedProducts.includes(product.id) ? "border-2 border-info" : ""
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
  );
};

export default AdminProductCard;
