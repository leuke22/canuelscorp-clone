const ProductCard = ({ productId, productName, productImage }) => {
  return (
    <div className="w-60 h-86 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
      <div className="px-4 flex-1/2 flex place-items-center">
        <img
          className="w-full content-center"
          src={productImage}
          alt={productId}
        />
      </div>
      <div className="p-5">
        <h1>{productName}</h1>
        <div className="flex flex-row justify-between items-center mt-2 gap-3">
          <input
            className="w-14 grow-0 px-3 py-0.5 border rounded-xl"
            type="number"
            name="quantity"
            id={productId}
            min={0}
            value={0}
          />
          <button className="size-10 grow-1 bg-submitButton rounded-full text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
