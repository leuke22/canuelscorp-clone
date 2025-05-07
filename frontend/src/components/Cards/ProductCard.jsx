import { useState } from "react";
import { ShopNowProduct } from "../../components";
import { FaArrowRightLong } from "react-icons/fa6";

const ProductCard = ({ isUserAuth, productId, productName, productImage }) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-60 h-96 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
        <div className="px-4 flex-1/2 flex place-items-center">
          <img
            className="w-full content-center"
            src={productImage}
            alt={productId}
          />
        </div>
        <div className="p-5 pb-0">
          <h1>{productName}</h1>
          <div className="flex flex-row justify-between mt-5 gap-3">
            {isUserAuth ? (
              <>
                <div className="flex flex-col place-items-center">
                  <input
                    type="number"
                    className="input validator rounded-lg"
                    required
                    placeholder="Quantity"
                    min="1"
                  />
                  <p className="validator-hint">The quantity must not be 0</p>
                </div>
                <button className="btn btn-primary border-0 rounded-xl text-gray-100">
                  Add to cart
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary w-full mb-4"
                onClick={() => setShowModal(true)}
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
