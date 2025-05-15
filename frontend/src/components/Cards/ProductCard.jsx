import { useState } from "react";
import { ShopNowProduct } from "../../components";
import { FaArrowRightLong } from "react-icons/fa6";
import { useCart } from "../../fetch/useCart";

const ProductCard = ({
  isUserAuth,
  productId,
  productName,
  productImage,
  productDescription,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    await addToCart(productId, quantity);
  };

  return (
    <>
      <div className="w-65 h-96 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between">
        <div className="px-4 h-50 place-items-center">
          <img
            className="w-full h-full content-center"
            src={productImage}
            alt={productId}
          />
        </div>
        <div className="p-5 pb-0">
          <h1 className="text-lg font-bold">{productName}</h1>
          <p className="text-gray-500 text-sm">{productDescription}</p>
          <div className="flex flex-row justify-between mt-5 gap-3">
            {isUserAuth ? (
              <div className="flex flex-row gap-4">
                <div className="flex flex-col place-items-center">
                  <input
                    type="number"
                    className="input validator rounded-lg"
                    required
                    placeholder="Quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <p className="validator-hint">The quantity must not be 0</p>
                </div>
                <button
                  className="btn btn-primary border-0 rounded-xl text-gray-100"
                  onClick={() => addToCart(productId, quantity)}
                >
                  Add to cart
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary w-full mb-4"
                onClick={handleAddToCart}
              >
                Shop Now
                <FaArrowRightLong />
              </button>
            )}
          </div>
        </div>
      </div>

      <ShopNowProduct isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ProductCard;
