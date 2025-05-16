import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../fetch/useCart";
import { CiEdit } from "react-icons/ci";

const CartCard = ({
  productId,
  productName,
  productImage,
  productDescription,
  quantity,
}) => {
  const { updateCartQuantity, isLoading, deleteProductItem } = useCart();
  const [qty, setQty] = useState(quantity);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQty(val);
    }
  };

  const handleConfirm = async () => {
    try {
      await updateCartQuantity(productId, qty);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCancel = () => {
    setQty(quantity);
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteProductItem(productId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:gap-5 shadow-sm rounded-md overflow-hidden h-80 md:h-40 mb-5 mr-2 bg-white">
      <div className="w-50 h-40 md:h-full ">
        <img
          src={
            productImage ||
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
          alt="Movie"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between w-full h-full">
        <div className="flex flex-col justify-center px-4 md:p-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {productName || "Error Getting Product Name"}
          </h5>
          <p className="mb-3 font-normal text-gray-500 text-sm">
            {productDescription || "Error Getting Product Description"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-10">
          {isEditing ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center join gap-2">
                <button
                  onClick={handleDecrement}
                  className="btn btn-square btn-sm btn-secondary join-item"
                  disabled={isLoading}
                >
                  <FaMinus />
                </button>
                <input
                  type="text"
                  value={qty}
                  onChange={handleChange}
                  className="w-12 text-center border-gray-300 focus:ring-0 rounded-md join-item"
                />
                <button
                  onClick={handleIncrement}
                  className="btn btn-square btn-sm btn-secondary join-item"
                  disabled={isLoading}
                >
                  <FaPlus />
                </button>
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleCancel}
                  className="btn btn-sm btn-outline btn-secondary btn-ghost flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="btn btn-sm btn-primary flex-1"
                  disabled={isLoading}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4">
              <p className="text-lg font-semibold">
                Quantity: <span className="text-gray-500">{qty}</span>
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-ghost btn-sm"
              >
                <CiEdit size={20} />
              </button>
            </div>
          )}

          <div
            onClick={handleDeleteClick}
            className="md:h-full w-full md:w-auto hover:bg-gray-100 hover:cursor-pointer flex items-center active:bg-gray-200 mt-2 md:mt-0 px-3 md:px-5"
            aria-label="Delete Product"
          >
            <MdDeleteOutline color="red" size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
